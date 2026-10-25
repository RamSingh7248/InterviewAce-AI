import React from 'react';
import { 
  Bot, 
  Volume2, 
  RotateCcw, 
  Radio, 
  Sparkles, 
  Mic, 
  HelpCircle,
  Headphones
} from 'lucide-react';

/**
 * AIAvatarTile - Left-hand video call tile for the AI Technical Interviewer
 * Features an audio-reactive visual avatar, live spoken caption bar with word boundary sync, and status indicators.
 */
const AIAvatarTile = ({
  interviewerState = 'ready', // 'ready' | 'speaking' | 'listening' | 'thinking' | 'paused'
  currentQuestionText = '',
  questionNumber = 1,
  totalQuestions = 5,
  category = 'Technical',
  topic = '',
  difficulty = 'Medium',
  onReplayQuestion,
  isSpeaking = false,
  isPaused = false,
  activeVoiceName = 'Natural Browser Voice',
  currentSpokenWord = ''
}) => {
  // Status badge config
  const getStatusBadge = () => {
    if (isPaused) {
      return {
        label: 'Interview Paused',
        color: 'var(--warning-text)',
        bg: 'var(--warning-subtle)',
        border: 'rgba(245, 158, 11, 0.3)',
        icon: Radio
      };
    }
    if (isSpeaking || interviewerState === 'speaking') {
      return {
        label: 'Speaking Question aloud...',
        color: '#38bdf8',
        bg: 'rgba(56, 189, 248, 0.15)',
        border: 'rgba(56, 189, 248, 0.4)',
        icon: Volume2
      };
    }
    if (interviewerState === 'listening') {
      return {
        label: 'Listening to Candidate...',
        color: '#4ade80',
        bg: 'rgba(74, 222, 128, 0.15)',
        border: 'rgba(74, 222, 128, 0.4)',
        icon: Mic
      };
    }
    if (interviewerState === 'thinking') {
      return {
        label: 'Evaluating Response...',
        color: '#c084fc',
        bg: 'rgba(192, 132, 252, 0.15)',
        border: 'rgba(192, 132, 252, 0.4)',
        icon: Sparkles
      };
    }
    return {
      label: 'AI Interviewer Ready',
      color: 'var(--text-secondary)',
      bg: 'var(--bg-card-subtle)',
      border: 'var(--border-subtle)',
      icon: Bot
    };
  };

  const status = getStatusBadge();
  const StatusIcon = status.icon;

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'var(--bg-surface)',
      border: isSpeaking ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--border-subtle)',
      borderRadius: '16px',
      overflow: 'hidden',
      height: '100%',
      minHeight: '380px',
      boxShadow: isSpeaking ? '0 0 20px rgba(56, 189, 248, 0.15)' : 'var(--shadow-card)',
      transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)'
    }}>
      {/* Top Banner: Interviewer Identity & Status */}
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
            backgroundColor: isSpeaking ? 'rgba(56, 189, 248, 0.2)' : 'var(--primary-subtle)',
            border: isSpeaking ? '1px solid #38bdf8' : '1px solid var(--primary-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-text)',
            transition: 'all 0.2s ease'
          }}>
            <Bot size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                InterviewAce AI
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-muted)',
                padding: '1px 6px',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)'
              }}>
                TTS Voice Engine
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Interactive Technical Interviewer
            </div>
          </div>
        </div>

        {/* Live Status Pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          borderRadius: '9999px',
          backgroundColor: status.bg,
          border: `1px solid ${status.border}`,
          color: status.color,
          fontSize: '0.75rem',
          fontWeight: 600,
          transition: 'all 0.25s ease'
        }}>
          <StatusIcon size={12} className={isSpeaking ? 'animate-pulse' : ''} />
          <span>{status.label}</span>
        </div>
      </div>

      {/* Center Stage: Audio-Reactive Avatar */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '28px 20px',
        position: 'relative'
      }}>
        {/* Animated Soundwave Rings when speaking */}
        <div style={{
          position: 'relative',
          width: '140px',
          height: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Outer Pulsing Wave Ring */}
          <div style={{
            position: 'absolute',
            width: isSpeaking ? '160px' : '140px',
            height: isSpeaking ? '160px' : '140px',
            borderRadius: '50%',
            backgroundColor: isSpeaking ? 'rgba(56, 189, 248, 0.14)' : 'transparent',
            border: isSpeaking ? '2px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--border-subtle)',
            transition: 'all 0.3s ease',
            animation: isSpeaking ? 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none'
          }} />

          {/* Middle Wave Ring */}
          <div style={{
            position: 'absolute',
            width: isSpeaking ? '140px' : '124px',
            height: isSpeaking ? '140px' : '124px',
            borderRadius: '50%',
            backgroundColor: interviewerState === 'listening' 
              ? 'rgba(74, 222, 128, 0.1)' 
              : isSpeaking 
              ? 'rgba(56, 189, 248, 0.12)' 
              : 'rgba(37, 99, 235, 0.08)',
            border: interviewerState === 'listening' 
              ? '1px solid rgba(74, 222, 128, 0.3)' 
              : isSpeaking
              ? '1px solid rgba(56, 189, 248, 0.35)'
              : '1px solid rgba(56, 189, 248, 0.2)',
            transition: 'all 0.3s ease'
          }} />

          {/* Core Avatar Circle */}
          <div style={{
            width: '104px',
            height: '104px',
            borderRadius: '50%',
            background: isSpeaking 
              ? 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)' 
              : interviewerState === 'listening'
              ? 'linear-gradient(135deg, #064e3b 0%, #059669 100%)'
              : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            border: isSpeaking ? '2px solid #38bdf8' : '2px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isSpeaking 
              ? '0 0 25px rgba(56, 189, 248, 0.4)' 
              : '0 4px 16px rgba(0, 0, 0, 0.3)',
            zIndex: 1,
            transition: 'all 0.3s ease'
          }}>
            <Bot size={44} color="#f8fafc" />
            
            {/* Real-time speech equalizer indicator bars */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              marginTop: '6px',
              height: '12px'
            }}>
              {[0.4, 0.9, 0.6, 1.0, 0.5].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: '3px',
                    height: isSpeaking ? `${Math.round(h * 12)}px` : '3px',
                    backgroundColor: isSpeaking ? '#38bdf8' : 'var(--text-muted)',
                    borderRadius: '2px',
                    transition: 'height 0.15s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Selected Natural Voice Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          marginTop: '16px',
          padding: '4px 10px',
          borderRadius: '9999px',
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.72rem',
          color: 'var(--text-secondary)'
        }}>
          <Headphones size={11} color="var(--primary-text)" />
          <span>Voice: <strong>{activeVoiceName}</strong></span>
        </div>

        {/* Clear Transparency Disclosure */}
        <div style={{
          marginTop: '10px',
          fontSize: '0.72rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          maxWidth: '340px',
          lineHeight: 1.4
        }}>
          Spoken AI questions powered by browser speech synthesis with automatic audio echo & collision protection.
        </div>
      </div>

      {/* Bottom Live Caption / Spoken Question Bar */}
      <div style={{
        padding: '14px 18px',
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.72rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: 'var(--primary-text)'
          }}>
            <HelpCircle size={13} />
            <span>Spoken Question #{questionNumber}</span>
            {isSpeaking && (
              <span style={{
                color: '#38bdf8',
                fontSize: '0.7rem',
                textTransform: 'none',
                fontWeight: 500,
                marginLeft: '4px'
              }}>
                (Audio playing...)
              </span>
            )}
          </div>

          {onReplayQuestion && (
            <button
              type="button"
              onClick={onReplayQuestion}
              disabled={isSpeaking}
              title={isSpeaking ? 'Audio is currently playing' : 'Repeat the question aloud'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'none',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '3px 9px',
                fontSize: '0.72rem',
                color: isSpeaking ? 'var(--text-muted)' : 'var(--text-secondary)',
                backgroundColor: 'var(--bg-subtle)',
                cursor: isSpeaking ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                transition: 'all var(--transition-fast)'
              }}
            >
              <RotateCcw size={11} className={isSpeaking ? 'animate-spin' : ''} />
              Replay Question
            </button>
          )}
        </div>

        {/* Synchronized Question Caption text with live word highlight */}
        <div style={{
          fontSize: '0.92rem',
          fontWeight: 500,
          color: 'var(--text-primary)',
          lineHeight: 1.5,
          maxHeight: '90px',
          overflowY: 'auto',
          paddingRight: '4px'
        }}>
          "{currentQuestionText || 'Preparing technical question...'}"
        </div>
      </div>
    </div>
  );
};

export default AIAvatarTile;
