import React from 'react';
import { 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Play, 
  Pause, 
  PhoneOff, 
  Keyboard, 
  Sparkles,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

/**
 * RoomControlDock - Floating bottom control dock for the video-call AI interview room
 */
const RoomControlDock = ({
  isMicMuted = false,
  onToggleMic,
  isCameraOn = false,
  onToggleCamera,
  isPaused = false,
  onTogglePause,
  onEndInterview,
  showTextFallback = false,
  onToggleTextFallback,
  onReplayQuestion,
  isSpeaking = false,
  disabled = false
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      padding: '12px 24px',
      backgroundColor: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: '20px',
      boxShadow: 'var(--shadow-dropdown)',
      backdropFilter: 'blur(12px)',
      flexWrap: 'wrap',
      transition: 'all var(--transition-normal)'
    }}>
      {/* Microphone Mute/Unmute */}
      <button
        type="button"
        onClick={onToggleMic}
        disabled={disabled}
        title={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '10px 16px',
          borderRadius: '12px',
          border: isMicMuted ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid var(--border-subtle)',
          backgroundColor: isMicMuted ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-subtle)',
          color: isMicMuted ? '#f87171' : 'var(--text-primary)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '0.78rem',
          transition: 'all var(--transition-fast)'
        }}
      >
        {isMicMuted ? <MicOff size={18} /> : <Mic size={18} color="#22c55e" />}
        <span>{isMicMuted ? 'Unmute' : 'Mute'}</span>
      </button>

      {/* Camera On/Off */}
      <button
        type="button"
        onClick={onToggleCamera}
        disabled={disabled}
        title={isCameraOn ? 'Turn camera off' : 'Turn camera on'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '10px 16px',
          borderRadius: '12px',
          border: isCameraOn ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid var(--border-subtle)',
          backgroundColor: isCameraOn ? 'rgba(34, 197, 94, 0.12)' : 'var(--bg-subtle)',
          color: isCameraOn ? '#4ade80' : 'var(--text-secondary)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '0.78rem',
          transition: 'all var(--transition-fast)'
        }}
      >
        {isCameraOn ? <Camera size={18} /> : <CameraOff size={18} />}
        <span>{isCameraOn ? 'Stop Cam' : 'Start Cam'}</span>
      </button>

      {/* Replay Question Aloud */}
      {onReplayQuestion && (
        <button
          type="button"
          onClick={onReplayQuestion}
          disabled={disabled || isSpeaking}
          title="Ask AI interviewer to speak the question again"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            padding: '10px 16px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-subtle)',
            color: 'var(--text-primary)',
            cursor: disabled || isSpeaking ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            fontSize: '0.78rem',
            transition: 'all var(--transition-fast)'
          }}
        >
          <RotateCcw size={18} className={isSpeaking ? 'animate-spin' : ''} />
          <span>Replay Q</span>
        </button>
      )}

      {/* Pause/Resume Interview */}
      <button
        type="button"
        onClick={onTogglePause}
        disabled={disabled}
        title={isPaused ? 'Resume interview' : 'Pause interview'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '10px 16px',
          borderRadius: '12px',
          border: isPaused ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle)',
          backgroundColor: isPaused ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-subtle)',
          color: isPaused ? '#facc15' : 'var(--text-primary)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '0.78rem',
          transition: 'all var(--transition-fast)'
        }}
      >
        {isPaused ? <Play size={18} /> : <Pause size={18} />}
        <span>{isPaused ? 'Resume' : 'Pause'}</span>
      </button>

      {/* Toggle Text-Only Fallback Mode */}
      <button
        type="button"
        onClick={onToggleTextFallback}
        disabled={disabled}
        title="Toggle between Voice-first and Text-first mode"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '10px 16px',
          borderRadius: '12px',
          border: showTextFallback ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
          backgroundColor: showTextFallback ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
          color: showTextFallback ? 'var(--primary-text)' : 'var(--text-secondary)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '0.78rem',
          transition: 'all var(--transition-fast)'
        }}
      >
        <Keyboard size={18} />
        <span>{showTextFallback ? 'Voice Mode' : 'Type Response'}</span>
      </button>

      {/* End Interview */}
      <button
        type="button"
        onClick={onEndInterview}
        title="End interview session and view assessment results"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '10px 18px',
          borderRadius: '12px',
          border: 'none',
          backgroundColor: '#ef4444',
          color: '#ffffff',
          cursor: 'pointer',
          fontWeight: 700,
          fontSize: '0.78rem',
          boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
          transition: 'all var(--transition-fast)'
        }}
      >
        <PhoneOff size={18} />
        <span>End Call</span>
      </button>
    </div>
  );
};

export default RoomControlDock;
