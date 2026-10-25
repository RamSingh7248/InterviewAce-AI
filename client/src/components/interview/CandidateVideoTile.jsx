import React, { useEffect, useRef } from 'react';
import { 
  User, 
  Camera, 
  CameraOff, 
  Mic, 
  MicOff, 
  ShieldCheck, 
  AlertCircle,
  Volume2,
  VolumeX,
  Pause
} from 'lucide-react';

/**
 * CandidateVideoTile - Right-hand video call tile for candidate webcam preview & microphone audio meter
 * Features genuine real-time audio visualization computed from HTML5 AudioContext & AnalyserNode,
 * clear device states (Live, Muted, Blocked, AI Standby, Paused), and webcam preview.
 */
const CandidateVideoTile = ({
  stream = null,
  cameraStream = null, // Dedicated independent camera MediaStream
  isCameraOn = false,
  isMicMuted = false,
  isListening = false,
  isAiSpeaking = false,
  isPaused = false,
  micPermission = 'prompt', // 'granted' | 'denied' | 'prompt'
  cameraPermission = 'prompt', // 'granted' | 'denied' | 'prompt'
  cameraError = '', // Human-readable camera initialization or access error
  audioLevel = 0, // 0 - 100 representing actual real-time microphone input volume
  candidateName = 'Candidate'
}) => {
  const videoRef = useRef(null);

  // Active video stream resolution (supports dedicated cameraStream or fallback stream)
  const activeVideoStream = cameraStream || stream;

  // Genuine check whether the stream contains an active, running video track
  const hasActiveVideoTrack = Boolean(
    activeVideoStream && 
    activeVideoStream.getVideoTracks().some(track => track.readyState === 'live' && track.enabled)
  );

  const isVideoLive = isCameraOn && hasActiveVideoTrack;

  // Sync video element with active stream and ensure playback starts
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isVideoLive && activeVideoStream) {
      if (videoEl.srcObject !== activeVideoStream) {
        videoEl.srcObject = activeVideoStream;
      }
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          if (err.name !== 'AbortError') {
            console.warn('Webcam preview play() notice:', err.message);
          }
        });
      }
    } else {
      videoEl.srcObject = null;
    }
  }, [activeVideoStream, isVideoLive]);

  const initials = (candidateName || 'Candidate')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  // Status computation for Microphone
  const getMicStatus = () => {
    if (micPermission === 'denied') {
      return {
        label: 'Mic Blocked',
        color: '#f87171',
        bg: 'rgba(239, 68, 68, 0.15)',
        border: 'rgba(239, 68, 68, 0.35)',
        icon: MicOff
      };
    }
    if (isMicMuted) {
      return {
        label: 'Mic Muted',
        color: '#f87171',
        bg: 'rgba(239, 68, 68, 0.15)',
        border: 'rgba(239, 68, 68, 0.35)',
        icon: MicOff
      };
    }
    if (isPaused) {
      return {
        label: 'Mic Paused',
        color: '#facc15',
        bg: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.35)',
        icon: Pause
      };
    }
    if (isAiSpeaking) {
      return {
        label: 'Echo Guard (AI Speaking)',
        color: '#38bdf8',
        bg: 'rgba(56, 189, 248, 0.15)',
        border: 'rgba(56, 189, 248, 0.35)',
        icon: Volume2
      };
    }
    if (isListening) {
      return {
        label: 'Listening Live...',
        color: '#4ade80',
        bg: 'rgba(74, 222, 128, 0.15)',
        border: 'rgba(74, 222, 128, 0.35)',
        icon: Mic
      };
    }
    return {
      label: 'Mic Ready',
      color: 'var(--text-secondary)',
      bg: 'var(--bg-subtle)',
      border: 'var(--border-subtle)',
      icon: Mic
    };
  };

  // Status computation for Camera (reflects actual live track, not merely button state)
  const getCameraStatus = () => {
    if (cameraPermission === 'denied') {
      return {
        label: 'Camera Blocked',
        color: '#f87171',
        bg: 'rgba(239, 68, 68, 0.15)',
        border: 'rgba(239, 68, 68, 0.3)',
        icon: CameraOff
      };
    }
    if (cameraError) {
      return {
        label: 'Camera Error',
        color: '#f87171',
        bg: 'rgba(239, 68, 68, 0.15)',
        border: 'rgba(239, 68, 68, 0.3)',
        icon: CameraOff
      };
    }
    if (isVideoLive) {
      return {
        label: 'Camera On',
        color: '#4ade80',
        bg: 'rgba(34, 197, 94, 0.15)',
        border: 'rgba(34, 197, 94, 0.3)',
        icon: Camera
      };
    }
    if (isCameraOn && !hasActiveVideoTrack) {
      return {
        label: 'Connecting...',
        color: '#facc15',
        bg: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.3)',
        icon: Camera
      };
    }
    return {
      label: 'Camera Off',
      color: 'var(--text-muted)',
      bg: 'var(--bg-subtle)',
      border: 'var(--border-subtle)',
      icon: CameraOff
    };
  };

  const micStatus = getMicStatus();
  const MicStatusIcon = micStatus.icon;
  const cameraStatus = getCameraStatus();
  const CameraStatusIcon = cameraStatus.icon;

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'var(--bg-surface)',
      border: isListening && audioLevel > 15 ? '1px solid rgba(74, 222, 128, 0.4)' : '1px solid var(--border-subtle)',
      borderRadius: '16px',
      overflow: 'hidden',
      height: '100%',
      minHeight: '380px',
      boxShadow: isListening && audioLevel > 15 ? '0 0 20px rgba(74, 222, 128, 0.12)' : 'var(--shadow-card)',
      transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)'
    }}>
      {/* Top Banner: Candidate Identity & Device Status */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        backgroundColor: 'rgba(15, 23, 42, 0.4)',
        borderBottom: '1px solid var(--border-subtle)',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '10px',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            fontWeight: 700,
            fontSize: '0.82rem'
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {candidateName}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Candidate (You)
            </div>
          </div>
        </div>

        {/* Device Indicators (Mic & Camera) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Dynamic Mic Status Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 9px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 600,
            backgroundColor: micStatus.bg,
            color: micStatus.color,
            border: `1px solid ${micStatus.border}`,
            transition: 'all 0.2s ease'
          }}>
            <MicStatusIcon size={11} className={isListening && audioLevel > 20 ? 'animate-pulse' : ''} />
            <span>{micStatus.label}</span>
          </div>

          {/* Dynamic Camera Status Badge (Reflects actual track) */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: 600,
            backgroundColor: cameraStatus.bg,
            color: cameraStatus.color,
            border: `1px solid ${cameraStatus.border}`
          }}>
            <CameraStatusIcon size={11} />
            <span>{cameraStatus.label}</span>
          </div>
        </div>
      </div>

      {/* Main Video Stage */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#070b14',
        overflow: 'hidden'
      }}>
        {isVideoLive ? (
          <video
            ref={(el) => {
              videoRef.current = el;
              if (el && activeVideoStream && el.srcObject !== activeVideoStream) {
                el.srcObject = activeVideoStream;
                el.play().catch(() => {});
              }
            }}
            autoPlay
            playsInline
            muted
            onLoadedMetadata={() => {
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)' // Mirror view for natural video call feel
            }}
          />
        ) : (
          /* Camera Off / Fallback Placeholder Avatar */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            padding: '20px',
            textAlign: 'center',
            maxWidth: '360px'
          }}>
            <div style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card-subtle)',
              border: cameraError || cameraPermission === 'denied' ? '2px solid rgba(239, 68, 68, 0.4)' : '2px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: cameraError || cameraPermission === 'denied' ? '#f87171' : 'var(--text-secondary)',
              fontSize: '1.8rem',
              fontWeight: 700
            }}>
              {cameraError || cameraPermission === 'denied' ? <CameraOff size={36} /> : initials}
            </div>

            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {candidateName}
              </div>
              
              {cameraError ? (
                <div style={{
                  fontSize: '0.75rem',
                  color: '#f87171',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  marginTop: '8px',
                  lineHeight: 1.4
                }}>
                  <AlertCircle size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
                  {cameraError}
                </div>
              ) : cameraPermission === 'denied' ? (
                <div style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '4px' }}>
                  Camera access blocked in browser settings. (Microphone active)
                </div>
              ) : (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Camera disabled (Microphone active)
                </div>
              )}
            </div>
          </div>
        )}

        {/* Real-time Microphone Audio Input Visualizer (Bottom-Left of Video Tile) */}
        {!isMicMuted && micPermission !== 'denied' && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.88)',
            border: isListening && audioLevel > 15 ? '1px solid rgba(74, 222, 128, 0.4)' : '1px solid var(--border-subtle)',
            borderRadius: '10px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backdropFilter: 'blur(8px)',
            zIndex: 3,
            transition: 'border-color 0.15s ease'
          }}>
            <Mic size={13} color={isListening ? (audioLevel > 20 ? '#4ade80' : '#38bdf8') : 'var(--text-muted)'} />
            
            {/* Real Audio Multi-Segment Visualizer Bars based on actual AudioContext measurement */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              height: '14px'
            }}>
              {[0.15, 0.35, 0.55, 0.75, 0.95].map((threshold, idx) => {
                const active = audioLevel >= threshold * 100;
                return (
                  <div
                    key={idx}
                    style={{
                      width: '4px',
                      height: active ? `${8 + idx * 2}px` : '4px',
                      backgroundColor: active 
                        ? (idx >= 3 ? '#22c55e' : '#38bdf8') 
                        : 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '2px',
                      transition: 'height 0.08s ease, background-color 0.08s ease'
                    }}
                  />
                );
              })}
            </div>

            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace', minWidth: '32px' }}>
              {Math.round(audioLevel)}%
            </span>
          </div>
        )}
      </div>

      {/* Bottom Privacy & Transmission Disclosure */}
      <div style={{
        padding: '10px 16px',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={13} color="var(--success-text)" />
          <span>Local Device Only: Audio stays in browser memory. No raw recordings stored.</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateVideoTile;
