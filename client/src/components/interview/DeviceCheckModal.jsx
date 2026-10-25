import React, { useRef, useEffect } from 'react';
import { 
  Camera, 
  CameraOff, 
  Mic, 
  MicOff, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  AlertCircle,
  Globe
} from 'lucide-react';

/**
 * DeviceCheckModal - Pre-interview room device check and permission authorization modal
 */
const DeviceCheckModal = ({
  isOpen = false,
  onJoinRoom,
  micPermission = 'prompt',
  cameraPermission = 'prompt',
  cameraError = '',
  cameraStream = null,
  isCameraOn = false,
  isMicMuted = false,
  onToggleCamera,
  onToggleMic,
  audioLevel = 0,
  sessionLanguage = 'en-US',
  onLanguageChange,
  onSkipToTextMode
}) => {
  const modalVideoRef = useRef(null);

  useEffect(() => {
    if (modalVideoRef.current && cameraStream && isCameraOn) {
      modalVideoRef.current.srcObject = cameraStream;
      modalVideoRef.current.play().catch(() => {});
    } else if (modalVideoRef.current) {
      modalVideoRef.current.srcObject = null;
    }
  }, [cameraStream, isCameraOn]);

  // Lock document body scroll while modal is open to keep background completely stationary
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to the AI Interview Room - Device Setup"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        minHeight: '100dvh',
        backgroundColor: 'rgba(7, 11, 20, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        zIndex: 100,
        padding: '32px 16px 48px 16px'
      }}
    >
      <div style={{
        maxWidth: '560px',
        width: '100%',
        margin: 'auto 0',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '20px',
        padding: 'clamp(20px, 4vw, 30px)',
        boxShadow: 'var(--shadow-dropdown)',
        color: 'var(--text-primary)',
        flexShrink: 0
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: 'var(--primary-subtle)',
            border: '1px solid var(--primary-border)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-text)',
            marginBottom: '14px'
          }}>
            <Sparkles size={24} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-primary)' }}>
            Welcome to the AI Interview Room
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Configure your microphone, optional webcam preview, and native language before joining.
          </p>
        </div>

        {/* Device Controls & Live Testing */}
        <div style={{
          backgroundColor: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '14px',
          padding: '20px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Native Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Globe size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Interview Language</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Questions and speech recognition language
                </div>
              </div>
            </div>

            <select
              value={sessionLanguage}
              onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
              aria-label="Select interview language"
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <option value="en-US">English (US)</option>
              <option value="hi-IN">Hindi (हिंदी)</option>
              <option value="en-IN">English (India)</option>
              <option value="en-GB">English (UK)</option>
            </select>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

          {/* Microphone Test */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: isMicMuted ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                color: isMicMuted ? '#f87171' : '#4ade80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isMicMuted ? <MicOff size={18} /> : <Mic size={18} />}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Microphone</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {micPermission === 'denied' 
                    ? 'Permission blocked in browser' 
                    : isMicMuted 
                    ? 'Microphone muted' 
                    : 'Speak to test input level'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Mic Visualizer */}
              {!isMicMuted && micPermission !== 'denied' && (
                <div style={{
                  width: '50px',
                  height: '6px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: '3px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${Math.min(100, Math.max(10, audioLevel))}%`,
                    height: '100%',
                    backgroundColor: '#22c55e',
                    transition: 'width 0.1s ease'
                  }} />
                </div>
              )}

              <button
                type="button"
                onClick={onToggleMic}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                {isMicMuted ? 'Unmute' : 'Mute'}
              </button>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

          {/* Camera Test (Optional) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: isCameraOn ? 'rgba(34, 197, 94, 0.15)' : 'var(--bg-subtle)',
                  color: isCameraOn ? '#4ade80' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {isCameraOn ? <Camera size={18} /> : <CameraOff size={18} />}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Webcam (Optional)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {cameraError ? cameraError : isCameraOn ? 'Live preview active' : 'Webcam disabled'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleCamera}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backgroundColor: isCameraOn ? 'rgba(34, 197, 94, 0.15)' : 'var(--bg-subtle)',
                  border: isCameraOn ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid var(--border-subtle)',
                  color: isCameraOn ? '#4ade80' : 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                {isCameraOn ? 'Disable Camera' : 'Enable Camera'}
              </button>
            </div>

            {/* Live Camera Preview inside Device Check Modal */}
            {isCameraOn && cameraStream && (
              <div style={{
                position: 'relative',
                width: '100%',
                height: '140px',
                borderRadius: '10px',
                overflow: 'hidden',
                backgroundColor: '#070b14',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                marginTop: '4px'
              }}>
                <video
                  ref={modalVideoRef}
                  autoPlay
                  playsInline
                  muted
                  onLoadedMetadata={() => {
                    modalVideoRef.current?.play().catch(() => {});
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scaleX(-1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: '#4ade80'
                }}>
                  Live Camera Preview Verified
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Permission Disclosure Notice */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          padding: '12px',
          backgroundColor: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: '10px',
          marginBottom: '24px',
          fontSize: '0.78rem',
          color: 'var(--primary-text)',
          lineHeight: 1.45
        }}>
          <ShieldCheck size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>
            <strong>Privacy Guarantee:</strong> All microphone capture and webcam video streams stay strictly inside your browser. No video frames or raw audio recordings are uploaded or stored.
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={onJoinRoom}
            style={{
              width: '100%',
              padding: '12px 20px',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: '10px',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
              transition: 'background-color var(--transition-fast)'
            }}
          >
            <span>Enter AI Interview Room</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            onClick={onSkipToTextMode}
            style={{
              width: '100%',
              padding: '10px 16px',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              fontWeight: 500,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Continue with Text-Only Input
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceCheckModal;
