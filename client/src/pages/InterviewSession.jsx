import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../services/api';
import LiveCodingStudio from '../components/interview/LiveCodingStudio';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Award, 
  HelpCircle, 
  Send, 
  Clock, 
  FileCheck2,
  Lightbulb, 
  XCircle, 
  TrendingUp, 
  Mic, 
  MicOff, 
  SkipForward, 
  Target, 
  Brain, 
  Zap, 
  Shield, 
  AlertTriangle,
  RefreshCw,
  Keyboard,
  RotateCcw,
  Trash2,
  Lock,
  Sparkles
} from 'lucide-react';
import Button from '../components/ui/Button';
import AIAvatarTile from '../components/interview/AIAvatarTile';
import CandidateVideoTile from '../components/interview/CandidateVideoTile';
import RoomControlDock from '../components/interview/RoomControlDock';
import DeviceCheckModal from '../components/interview/DeviceCheckModal';
import voiceManager from '../services/voiceManager';
import '../styles/auth.css';

// Interview mode labels for display
const MODE_LABELS = {
  mixed: 'Mixed Technical',
  conceptual: 'Conceptual Deep-Dive',
  coding: 'Live Coding',
  live_coding: 'Live Coding',
  sql: 'SQL & Database',
  debugging: 'Debugging Round',
  system_design: 'System Design',
  scenario: 'Scenario-Based',
  role_specific: 'Role-Specific'
};

const LEVEL_LABELS = {
  internship: 'Internship',
  fresher: 'Fresher',
  junior: 'Junior',
  mid: 'Mid-Level',
  senior: 'Senior / Staff'
};

const CONFIDENCE_OPTIONS = [
  { value: 1, label: 'Not Sure', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  { value: 2, label: 'Somewhat', color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
  { value: 3, label: 'Confident', color: '#eab308', bg: 'rgba(234,179,8,0.12)' },
  { value: 4, label: 'Very Confident', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' }
];

// Format seconds as MM:SS
const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

// Score ring SVG component
const ScoreRing = ({ score, size = 90 }) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 10) * circumference;
  const color = score >= 7 ? '#22c55e' : score >= 5 ? '#eab308' : '#ef4444';
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border-subtle)" strokeWidth="8" />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeDasharray={`${filled} ${circumference}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.7s ease' }}
      />
      <text
        x="50%" y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="1.3rem"
        fontWeight="700"
        style={{ transform: 'rotate(90deg)', transformOrigin: 'center', fontFamily: 'inherit' }}
      >
        {score}
      </text>
    </svg>
  );
};

const InterviewSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isLiveCoding = Boolean(
    location.state?.interviewMode === 'live_coding' ||
    location.state?.interviewMode === 'coding'
  );

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [confidence, setConfidence] = useState(null);

  // Server-authoritative timestamp timer state
  const [serverClockOffset, setServerClockOffset] = useState(0);
  const [nowTs, setNowTs] = useState(Date.now());

  // Room & Media states - bypass modal completely if live coding mode
  const [showDeviceModal, setShowDeviceModal] = useState(() => {
    const navMode = location.state?.interviewMode;
    return navMode !== 'live_coding' && navMode !== 'coding';
  });
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [micPermission, setMicPermission] = useState('prompt');
  const [cameraPermission, setCameraPermission] = useState('prompt');
  const [cameraError, setCameraError] = useState('');
  // New flag indicating that permission was already granted and we can auto‑start the webcam
  const [cameraReady, setCameraReady] = useState(false);
  // Ref to ensure we only auto‑start the camera once per interview session
  const autoCameraStartedRef = useRef(false);
  const [mediaStream, setMediaStream] = useState(null); // Dedicated microphone stream
  const [cameraStream, setCameraStream] = useState(null); // Dedicated webcam stream
  const [audioLevel, setAudioLevel] = useState(0);
  const [showTextFallback, setShowTextFallback] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // AI Interviewer Voice & State
  const [interviewerState, setInterviewerState] = useState('ready'); // 'ready' | 'speaking' | 'listening' | 'thinking' | 'paused'
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionLanguage, setSessionLanguage] = useState('en-US'); // 'en-US' | 'hi-IN' | 'en-IN' | 'en-GB'
  const [languageNotice, setLanguageNotice] = useState('');

  // Speech Recognition state
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [speechLang, setSpeechLang] = useState('en-US');
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');
  const baseAnswerRef = useRef('');
  const spokenQuestionIdsRef = useRef(new Set()); // Strict rerender deduplication
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);

  // 1-second pulse to update timestamp-based calculations without mutating state accumulators
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTs(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mediaStreamRef = useRef(null);
  const cameraStreamRef = useRef(null);

  // Toggle Camera independently without mutating or touching microphone stream.
  // Guard against duplicate start calls and ensure clean stop before re‑starting.
  // Wrapped in useCallback so downstream useEffects/components get a stable reference.
  const handleToggleCamera = useCallback(async () => {
    if (cameraStreamRef.current) {
      // Camera is currently on — stop it
      try {
        cameraStreamRef.current.getVideoTracks().forEach(track => track.stop());
      } catch (e) {}
      setCameraStream(null);
      setIsCameraOn(false);
      setCameraError('');
      return;
    }

    setCameraError('');
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      const videoTrack = videoStream.getVideoTracks()[0];
      if (!videoTrack) {
        throw new Error('No active video track detected on device.');
      }

      videoTrack.onended = () => {
        setIsCameraOn(false);
        setCameraStream(null);
      };

      setCameraStream(videoStream);
      setIsCameraOn(true);
      setCameraPermission('granted');
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setIsCameraOn(false);
      setCameraStream(null);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraPermission('denied');
        setCameraError('Camera permission was denied in your browser settings.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No webcam device detected on your system.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setCameraError('Webcam is already in use by another application.');
      } else {
        setCameraError(err.message || 'Unable to access camera.');
      }
    }
  }, []);
  const isComponentMountedRef = useRef(true);

  // Operational state refs to eliminate stale closure bugs during async media & speech transitions
  const isSpeakingRef = useRef(false);
  const isListeningRef = useRef(false);
  const isMicMutedRef = useRef(false);
  const isPausedRef = useRef(false);
  const isSubmittingRef = useRef(false);
  const sessionLanguageRef = useRef('en-US');
  const showDeviceModalRef = useRef(true);
  const shouldListenRef = useRef(false);
  const activeRecognitionRef = useRef(null);
  const retryRecognitionTimeoutRef = useRef(null);
  const recognitionInstanceIdRef = useRef(0);
  const committedTranscriptRef = useRef('');
  const currentSessionFinalRef = useRef('');
  const currentSessionInterimRef = useRef('');
  const speechTimeoutRef = useRef(null);
  const safeStartRecognitionRef = useRef(null);

  // Keep refs in sync with state for lifecycle stability
  useEffect(() => { mediaStreamRef.current = mediaStream; }, [mediaStream]);
  useEffect(() => { cameraStreamRef.current = cameraStream; }, [cameraStream]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
  useEffect(() => { isListeningRef.current = isListening; }, [isListening]);
  useEffect(() => { isMicMutedRef.current = isMicMuted; }, [isMicMuted]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { isSubmittingRef.current = submitting; }, [submitting]);
  useEffect(() => { sessionLanguageRef.current = sessionLanguage; }, [sessionLanguage]);
  useEffect(() => { showDeviceModalRef.current = showDeviceModal; }, [showDeviceModal]);

  // Query camera permission once when interview becomes available.
  // This must NOT return a cleanup that stops streams — that lives in the unmount effect below.
  useEffect(() => {
    if (!interview || isLiveCoding) return;

    // Probe existing camera permission without starting a stream
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'camera' })
        .then((result) => {
          if (result.state === 'granted') {
            setCameraPermission('granted');
            setCameraReady(true);
          } else if (result.state === 'denied') {
            setCameraPermission('denied');
          }
        })
        .catch(() => {
          // Permissions API not available for camera — skip; the join-room
          // flow will request permission explicitly.
        });
    }
  // Only re-probe when the interview session ID changes (i.e. new session, not question update)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interview?._id]);

  // Cleanup ALL media resources strictly on component unmount.
  // This effect intentionally has an empty dependency array so it NEVER
  // runs its cleanup on question transitions — only when the page unmounts.
  useEffect(() => {
    isComponentMountedRef.current = true;
    return () => {
      isComponentMountedRef.current = false;
      if (retryRecognitionTimeoutRef.current) clearTimeout(retryRecognitionTimeoutRef.current);
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
      voiceManager.cancel();
      if (activeRecognitionRef.current) {
        try { activeRecognitionRef.current.abort(); } catch (e) {}
        activeRecognitionRef.current = null;
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }
      if (mediaStreamRef.current) {
        try { mediaStreamRef.current.getTracks().forEach((track) => track.stop()); } catch (e) {}
      }
      if (cameraStreamRef.current) {
        try { cameraStreamRef.current.getTracks().forEach((track) => track.stop()); } catch (e) {}
      }
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch (e) {}
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Request browser microphone permissions (Microphone only, completely separate from webcam)
  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      setMediaStream(stream);
      setMicPermission('granted');

      // Initialize HTML5 AudioContext for live microphone audio level visualizer
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          audioContextRef.current = audioCtx;
          analyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateAudioLevel = () => {
            if (analyserRef.current) {
              analyserRef.current.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const average = sum / dataArray.length;
              const normalized = Math.min(100, Math.round((average / 128) * 100));
              setAudioLevel(normalized);
            }
            animFrameRef.current = requestAnimationFrame(updateAudioLevel);
          };
          updateAudioLevel();
        }
      } catch (audioErr) {
        console.warn('AudioContext visualization initialization note:', audioErr.message);
      }
    } catch (err) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicPermission('denied');
        setSpeechError('Microphone permission was denied. You can continue typing your answers.');
        setShowTextFallback(true);
      } else {
        console.warn('Media initialization warning:', err.message);
      }
    }
  };



  // Helper to compute combined answer from committed base and current session
  const syncAnswerState = useCallback((sessionFinal = '', sessionInterim = '') => {
    const base = committedTranscriptRef.current ? committedTranscriptRef.current.trimEnd() + ' ' : '';
    const finalChunk = sessionFinal.trim();
    const interimChunk = sessionInterim.trim();

    let combined = base;
    if (finalChunk) {
      combined = combined ? `${combined}${finalChunk}` : finalChunk;
    }
    if (interimChunk) {
      combined = combined ? `${combined} ${interimChunk}` : interimChunk;
    }

    setInterimText(interimChunk);
    setAnswer(combined);
  }, []);

  // Stop speech recognition cleanly with token invalidation to ignore ghost events
  const safeStopRecognition = useCallback((permanent = false) => {
    if (permanent) {
      shouldListenRef.current = false;
    }
    if (retryRecognitionTimeoutRef.current) {
      clearTimeout(retryRecognitionTimeoutRef.current);
      retryRecognitionTimeoutRef.current = null;
    }

    // Invalidate active instance token so late asynchronous events are safely ignored
    recognitionInstanceIdRef.current++;

    if (activeRecognitionRef.current) {
      try {
        activeRecognitionRef.current.abort();
      } catch (e) {}
      activeRecognitionRef.current = null;
    }

    // Commit any uncommitted text from the active session so no spoken words are lost
    const sessionText = (currentSessionFinalRef.current.trim() || currentSessionInterimRef.current.trim());
    if (sessionText) {
      const base = committedTranscriptRef.current ? committedTranscriptRef.current.trimEnd() + ' ' : '';
      committedTranscriptRef.current = `${base}${sessionText}`;
    }
    currentSessionFinalRef.current = '';
    currentSessionInterimRef.current = '';

    isListeningRef.current = false;
    setIsListening(false);
    setInterimText('');
    if (committedTranscriptRef.current) {
      setAnswer(committedTranscriptRef.current);
    }
  }, []);

  // Speech-to-Text Recognition starter with token session isolation and pure accumulation
  const safeStartRecognition = useCallback(() => {
    if (!isComponentMountedRef.current) return;
    if (showDeviceModalRef.current) return;
    if (isMicMutedRef.current) return;
    if (isSpeakingRef.current || voiceManager.isSpeaking) return;
    if (isPausedRef.current) return;
    if (isSubmittingRef.current) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or type your response.');
      setShowTextFallback(true);
      return;
    }

    shouldListenRef.current = true;

    // Clean up any existing recognition instance
    if (activeRecognitionRef.current) {
      try {
        activeRecognitionRef.current.abort();
      } catch (e) {}
      activeRecognitionRef.current = null;
    }

    // Allocate fresh instance token
    const instanceId = ++recognitionInstanceIdRef.current;
    currentSessionFinalRef.current = '';
    currentSessionInterimRef.current = '';

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = sessionLanguageRef.current || 'en-US';

      recognition.onstart = () => {
        if (instanceId !== recognitionInstanceIdRef.current) return;
        isListeningRef.current = true;
        setIsListening(true);
        setSpeechError('');
        setInterviewerState('listening');
      };

      recognition.onresult = (event) => {
        if (instanceId !== recognitionInstanceIdRef.current) return;

        let sessionFinal = '';
        let sessionInterim = '';

        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) {
            sessionFinal += res[0].transcript + ' ';
          } else {
            sessionInterim += res[0].transcript;
          }
        }

        currentSessionFinalRef.current = sessionFinal;
        currentSessionInterimRef.current = sessionInterim;
        syncAnswerState(sessionFinal, sessionInterim);
      };

      recognition.onerror = (event) => {
        if (instanceId !== recognitionInstanceIdRef.current) return;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          shouldListenRef.current = false;
          setSpeechError('Microphone permission blocked. Please enable microphone permissions in your browser address bar.');
          setShowTextFallback(true);
          isListeningRef.current = false;
          setIsListening(false);
        } else if (event.error === 'audio-capture') {
          shouldListenRef.current = false;
          setSpeechError('No microphone detected. Please connect an audio input device.');
          setShowTextFallback(true);
          isListeningRef.current = false;
          setIsListening(false);
        } else if (event.error === 'network') {
          setSpeechError('Speech recognition network glitch. Click "Retry Microphone" or type your response.');
        } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
          console.warn('Speech recognition notice:', event.error);
        }
      };

      recognition.onend = () => {
        if (instanceId !== recognitionInstanceIdRef.current) return;

        // Commit this session's text so nothing is lost across restarts
        const sessionText = (currentSessionFinalRef.current.trim() || currentSessionInterimRef.current.trim());
        if (sessionText) {
          const base = committedTranscriptRef.current ? committedTranscriptRef.current.trimEnd() + ' ' : '';
          committedTranscriptRef.current = `${base}${sessionText}`;
        }
        currentSessionFinalRef.current = '';
        currentSessionInterimRef.current = '';

        isListeningRef.current = false;
        setIsListening(false);
        setInterimText('');
        setAnswer(committedTranscriptRef.current);

        // Auto-reconnect if we still want to listen (silence pause or Chrome timeout)
        if (
          shouldListenRef.current &&
          isComponentMountedRef.current &&
          !isSpeakingRef.current &&
          !voiceManager.isSpeaking &&
          !isMicMutedRef.current &&
          !isPausedRef.current &&
          !isSubmittingRef.current &&
          !showDeviceModalRef.current
        ) {
          if (retryRecognitionTimeoutRef.current) clearTimeout(retryRecognitionTimeoutRef.current);
          retryRecognitionTimeoutRef.current = setTimeout(() => {
            safeStartRecognitionRef.current?.();
          }, 200);
        }
      };

      activeRecognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Recognition start exception:', err.message);
      if (
        shouldListenRef.current &&
        !isSpeakingRef.current &&
        !voiceManager.isSpeaking &&
        !isMicMutedRef.current
      ) {
        if (retryRecognitionTimeoutRef.current) clearTimeout(retryRecognitionTimeoutRef.current);
        retryRecognitionTimeoutRef.current = setTimeout(() => {
          safeStartRecognitionRef.current?.();
        }, 350);
      }
    }
  }, [syncAnswerState]);

  safeStartRecognitionRef.current = safeStartRecognition;

  // Backwards compatibility alias
  const startSpeechRecognition = safeStartRecognition;

  // Toggle Microphone Mute
  const handleToggleMic = () => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach(track => {
        track.enabled = isMicMuted; // Invert enabled state
      });
    }
    const nextMuted = !isMicMuted;
    setIsMicMuted(nextMuted);
    isMicMutedRef.current = nextMuted;

    if (nextMuted) {
      safeStopRecognition(true);
    } else if (!isSpeakingRef.current && !evaluation) {
      safeStartRecognition();
    }
  };

  // Clear transcript control
  const handleClearTranscript = () => {
    setAnswer('');
    setInterimText('');
    committedTranscriptRef.current = '';
    currentSessionFinalRef.current = '';
    currentSessionInterimRef.current = '';
  };

  // Retry speech recognition
  const handleRetrySpeech = () => {
    setSpeechError('');
    safeStopRecognition(false);
    safeStartRecognition();
  };

  // Speak question aloud using voiceManager with deduplication, watchdog timer, and collision prevention
  const speakQuestion = useCallback((text, questionId, force = false) => {
    if (!text || isLiveCoding) return;

    // AUDIO COLLISION PREVENTION:
    // Halt microphone speech recognition immediately before speaking question
    safeStopRecognition(false);
    isSpeakingRef.current = true;
    setIsSpeaking(true);
    setInterviewerState('speaking');

    // Safety watchdog: in case SpeechSynthesis audio freezes, force end speaking after estimated speech duration
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    const estimatedDuration = Math.max(5000, text.length * 85);
    speechTimeoutRef.current = setTimeout(() => {
      if (isSpeakingRef.current) {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        setInterviewerState('listening');
        if (!isMicMutedRef.current && !showDeviceModalRef.current && !isPausedRef.current && !isSubmittingRef.current) {
          safeStartRecognition();
        }
      }
    }, estimatedDuration);

    voiceManager.speak({
      text,
      id: questionId,
      lang: sessionLanguageRef.current,
      force,
      onStart: () => {
        isSpeakingRef.current = true;
        setIsSpeaking(true);
        setInterviewerState('speaking');
        safeStopRecognition(false);
      },
      onEnd: () => {
        if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        setInterviewerState('listening');

        // Acoustic echo delay: wait 350ms before opening candidate microphone
        if (retryRecognitionTimeoutRef.current) clearTimeout(retryRecognitionTimeoutRef.current);
        retryRecognitionTimeoutRef.current = setTimeout(() => {
          if (
            isComponentMountedRef.current &&
            !isMicMutedRef.current &&
            !showDeviceModalRef.current &&
            !isPausedRef.current &&
            !isSubmittingRef.current
          ) {
            safeStartRecognition();
          }
        }, 350);
      },
      onError: (err) => {
        if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
        console.warn('Voice playback notice:', err.message);
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        setInterviewerState('ready');
        if (!isMicMutedRef.current && !showDeviceModalRef.current && !isPausedRef.current && !isSubmittingRef.current) {
          safeStartRecognition();
        }
      },
      onVoiceFallback: ({ requestedLang, voiceUsed }) => {
        setLanguageNotice(`Notice: Questions are spoken with ${voiceUsed} (system fallback for ${requestedLang}). Hindi speech recognition is active.`);
      }
    });
  }, [safeStartRecognition, safeStopRecognition]);

  // Handle mid-session language change
  const handleLanguageChange = async (newLang) => {
    setSessionLanguage(newLang);
    sessionLanguageRef.current = newLang;
    setSpeechLang(newLang);
    setLanguageNotice('');

    // Check if browser has native voice for requested language
    if (!voiceManager.isLanguageVoiceAvailable(newLang) && newLang.startsWith('hi')) {
      setLanguageNotice('Browser Notice: Your browser lacks a native Hindi voice pack. Questions will play with your system default voice, while Hindi candidate speech recognition is active.');
    }

    if (activeRecognitionRef.current) {
      activeRecognitionRef.current.lang = newLang;
      if (isListeningRef.current) {
        safeStopRecognition(false);
        setTimeout(() => {
          safeStartRecognition();
        }, 150);
      }
    }

    // Persist language setting to backend session
    try {
      await api.patch(`/interviews/${id}/settings`, { language: newLang });
    } catch (err) {
      console.warn('Could not persist language to backend:', err.message);
    }
  };

  // Toggle Listening
  const toggleListening = () => {
    if (isListeningRef.current) {
      safeStopRecognition(true);
    } else {
      safeStartRecognition();
    }
  };

  // Fetch interview state from backend
  const fetchInterview = useCallback(async () => {
    try {
      const response = await api.get(`/interviews/${id}`);
      if (response.data && response.data.status === 'success') {
        const data = response.data.interview;
        if (response.data.serverTime) {
          setServerClockOffset(Date.parse(response.data.serverTime) - Date.now());
        }
        setInterview(data);

        if (data.interviewMode === 'live_coding' || data.interviewMode === 'coding') {
          setShowDeviceModal(false);
        }

        // Sync native language from saved interview session
        if (data.language) {
          setSessionLanguage(data.language);
          setSpeechLang(data.language);
        }

        if (data.status === 'completed') {
          navigate(`/interview/${id}/results`, { replace: true });
          return;
        }

        const currentQ = data.questions[data.currentQuestionIndex];
        const initialAns = currentQ?.userAnswer || '';
        if (currentQ && currentQ.evaluation && currentQ.evaluation.score !== undefined) {
          setEvaluation(currentQ.evaluation);
          setAnswer(initialAns);
          committedTranscriptRef.current = initialAns;
          currentSessionFinalRef.current = '';
          currentSessionInterimRef.current = '';
          setInterimText('');
          setInterviewerState('ready');
        } else {
          setEvaluation(null);
          setAnswer(initialAns);
          committedTranscriptRef.current = initialAns;
          currentSessionFinalRef.current = '';
          currentSessionInterimRef.current = '';
          setInterimText('');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load interview session.');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => { fetchInterview(); }, [fetchInterview]);

  // Speak question aloud once session loads or question index changes (with rerender deduplication)
  useEffect(() => {
    if (!showDeviceModal && interview && !evaluation && !loading) {
      const currentQ = interview.questions[interview.currentQuestionIndex];
      const qId = currentQ?.questionId || `q_${interview.currentQuestionIndex}`;
      if (currentQ && currentQ.questionText && !spokenQuestionIdsRef.current.has(qId)) {
        spokenQuestionIdsRef.current.add(qId);
        speakQuestion(currentQ.questionText, qId, false);
      }
    }
  }, [showDeviceModal, interview?.currentQuestionIndex, evaluation, loading, speakQuestion, interview]);

  // ---------------------------------------------------------------------------
  // Auto‑start webcam if permission is already granted when the interview UI is shown.
  // Runs only once per session thanks to autoCameraStartedRef.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!showDeviceModal && interview && !loading && cameraReady && !autoCameraStartedRef.current) {
      handleToggleCamera();
      autoCameraStartedRef.current = true;
    }
  }, [showDeviceModal, interview?._id, loading, cameraReady, handleToggleCamera]);

  // Handle Joining Room from Pre-Interview Check Modal
  // Ensure we have microphone ready AND request webcam permission early (no stream started yet)
  const ensureCameraPermission = async () => {
    try {
      const permStream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Permission granted – we don't need the tracks, just stop them immediately
      permStream.getTracks().forEach(t => t.stop());
      setCameraPermission('granted');
      setCameraReady(true);
    } catch (err) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraPermission('denied');
        setCameraReady(false);
        setCameraError('Camera permission was denied. You can continue without webcam.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No webcam device detected on your system.');
        setCameraReady(false);
      } else {
        console.warn('Camera permission request warning:', err.message);
        setCameraError(err.message);
        setCameraReady(false);
      }
    }
  };

  const handleJoinRoom = async () => {
    if (!mediaStream) {
      await initializeMedia(); // initialize audio without clobbering cameraStream
    }
    // Request webcam permission now (if not already granted/denied)
    await ensureCameraPermission();
    showDeviceModalRef.current = false;
    setShowDeviceModal(false);
  };

  // Continue text only
  const handleSkipToTextMode = () => {
    showDeviceModalRef.current = false;
    setShowDeviceModal(false);
    setShowTextFallback(true);
  };

  // Pause / Resume toggle with audio synchronization
  const handleTogglePause = () => {
    if (isPaused) {
      setIsPaused(false);
      isPausedRef.current = false;
      setInterviewerState('ready');
      voiceManager.resume();
      if (!isMicMutedRef.current && !voiceManager.isSpeaking && !evaluation) {
        safeStartRecognition();
      }
    } else {
      setIsPaused(true);
      isPausedRef.current = true;
      setInterviewerState('paused');
      voiceManager.pause();
      safeStopRecognition(true);
    }
  };

  // Replay question aloud
  const handleReplayQuestion = () => {
    const currentQ = interview?.questions?.[interview?.currentQuestionIndex];
    const qId = currentQ?.questionId || `q_${interview?.currentQuestionIndex}`;
    if (currentQ?.questionText) {
      speakQuestion(currentQ.questionText, qId, true); // force replay
    }
  };

  // Handle Answer Submission
  const handleSubmitAnswer = async (e) => {
    if (e) e.preventDefault();
    if (submitting) return;

    if (!answer.trim()) {
      setError('Please provide a technical answer before submitting.');
      return;
    }

    safeStopRecognition(true);
    voiceManager.cancel();
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    setInterviewerState('thinking');

    setError('');
    isSubmittingRef.current = true;
    setSubmitting(true);

    const currentQ = interview?.questions?.[interview.currentQuestionIndex];

    try {
      const response = await api.post(`/interviews/${id}/answer`, {
        answer: answer.trim(),
        questionId: currentQ?.questionId
      });
      if (response.data && response.data.status === 'success') {
        setEvaluation(response.data.evaluation);
        setInterview(response.data.interview);
        setInterviewerState('ready');
        if (response.data.serverTime) {
          setServerClockOffset(Date.parse(response.data.serverTime) - Date.now());
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit answer. Please try again.');
      setInterviewerState('ready');
    } finally {
      isSubmittingRef.current = false;
      setSubmitting(false);
    }
  };

  // Retry AI evaluation
  const handleRetryEvaluation = async () => {
    if (submitting) return;

    safeStopRecognition(true);
    setError('');
    isSubmittingRef.current = true;
    setSubmitting(true);
    setInterviewerState('thinking');

    try {
      const response = await api.post(`/interviews/${id}/retry`, {
        answer: answer.trim() || undefined
      });
      if (response.data && response.data.status === 'success') {
        setEvaluation(response.data.evaluation);
        setInterview(response.data.interview);
        setInterviewerState('ready');
        if (response.data.serverTime) {
          setServerClockOffset(Date.parse(response.data.serverTime) - Date.now());
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to retry evaluation. Please try again.');
      setInterviewerState('ready');
    } finally {
      isSubmittingRef.current = false;
      setSubmitting(false);
    }
  };

  // Skip question
  const handleSkip = async () => {
    if (submitting) return;

    safeStopRecognition(true);
    voiceManager.cancel();
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    setInterviewerState('thinking');

    setError('');
    isSubmittingRef.current = true;
    setSubmitting(true);
    const currentQ = interview?.questions?.[interview.currentQuestionIndex];

    try {
      const response = await api.post(`/interviews/${id}/answer`, {
        answer: '[Skipped]',
        questionId: currentQ?.questionId
      });
      if (response.data && response.data.status === 'success') {
        setEvaluation(response.data.evaluation);
        setInterview(response.data.interview);
        setInterviewerState('ready');
        if (response.data.serverTime) {
          setServerClockOffset(Date.parse(response.data.serverTime) - Date.now());
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to skip question.');
      setInterviewerState('ready');
    } finally {
      isSubmittingRef.current = false;
      setSubmitting(false);
    }
  };

  // Advance to next question
  const handleProceed = async () => {
    if (advancing) return;

    safeStopRecognition(true);
    voiceManager.cancel();
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    setSpeechError('');

    if (!interview) return;

    const isLast = (interview.currentQuestionIndex + 1) >= interview.totalQuestions;

    if (interview.status === 'completed' || isLast) {
      navigate(`/interview/${id}/results`);
      return;
    }

    try {
      setAdvancing(true);
      const res = await api.post(`/interviews/${id}/next`);
      if (res.data && res.data.status === 'success' && res.data.interview) {
        setInterview(res.data.interview);
        if (res.data.serverTime) {
          setServerClockOffset(Date.parse(res.data.serverTime) - Date.now());
        }
        setEvaluation(null);
        setAnswer('');
        finalTranscriptRef.current = '';
        committedTranscriptRef.current = '';
        currentSessionFinalRef.current = '';
        currentSessionInterimRef.current = '';
        setInterimText('');
        setError('');
        setShowHint(false);
        setConfidence(null);
        setInterviewerState('ready');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to advance to the next question.');
    } finally {
      setAdvancing(false);
    }
  };

  // End interview and view assessment results
  const handleEndInterview = () => {
    if (window.confirm('Are you sure you want to end this interview? Your completed answers will be evaluated and finalized.')) {
      safeStopRecognition(true);
      voiceManager.cancel();
      if (mediaStreamRef.current) {
        try { mediaStreamRef.current.getTracks().forEach(t => t.stop()); } catch (e) {}
      }
      if (cameraStreamRef.current) {
        try { cameraStreamRef.current.getTracks().forEach(t => t.stop()); } catch (e) {}
      }
      navigate(`/interview/${id}/results`);
    }
  };

  // Derived question and interview parameters
  const currentIndex = interview?.currentQuestionIndex ?? 0;
  const currentQ = interview?.questions?.[currentIndex];
  const questionNumber = currentIndex + 1;
  const totalQuestions = interview?.totalQuestions || 1;
  const isLastQuestion = questionNumber >= totalQuestions;

  // Server-authoritative time calculations
  const effectiveNow = nowTs + serverClockOffset;
  const sessionStartedAt = Date.parse(interview?.startedAt || interview?.createdAt || new Date());
  const totalSessionElapsed = Math.max(0, Math.floor((effectiveNow - sessionStartedAt) / 1000));

  const qStartedAt = Date.parse(currentQ?.startedAt || interview?.currentQuestionStartedAt || interview?.startedAt || new Date());
  const questionElapsed = currentQ?.isAnswered
    ? (currentQ?.timeSpentSeconds || Math.max(0, Math.round(((currentQ?.submittedAt ? Date.parse(currentQ.submittedAt) : effectiveNow) - qStartedAt) / 1000)))
    : Math.max(0, Math.floor((effectiveNow - qStartedAt) / 1000));

  const isTimedMode = Boolean(interview?.timedMode && interview?.timeLimitPerQuestion > 0);
  const timeLimit = interview?.timeLimitPerQuestion || 0;
  const remainingSeconds = isTimedMode ? Math.max(0, timeLimit - questionElapsed) : 0;

  // Auto-submit if timed mode expires
  useEffect(() => {
    if (isTimedMode && remainingSeconds === 0 && !evaluation && !submitting && currentQ && !currentQ.isAnswered && !loading && interview) {
      handleSubmitAnswer();
    }
  }, [isTimedMode, remainingSeconds, evaluation, submitting, currentQ, loading, interview, handleSubmitAnswer]);

  // Question minimap dots
  const questionDots = interview?.questions?.map((q, i) => {
    const evaluated = q.evaluation && q.evaluation.score !== undefined;
    const isCurrent = i === currentIndex;
    const score = q.evaluation?.score;
    let dotColor = 'var(--border-subtle)';
    if (evaluated) dotColor = score >= 7 ? '#22c55e' : score >= 5 ? '#eab308' : '#ef4444';
    if (isCurrent && !evaluated) dotColor = '#2563eb';
    return { evaluated, isCurrent, dotColor, score };
  }) || [];

  // Timer color
  let timerColor = '#94a3b8';
  if (isTimedMode) {
    timerColor = remainingSeconds <= 15 ? '#ef4444' : remainingSeconds <= 30 ? '#f97316' : '#22c55e';
  } else {
    timerColor = questionElapsed > 180 ? '#ef4444' : questionElapsed > 90 ? '#eab308' : '#94a3b8';
  }

  // Loading State
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-text)', transition: 'background-color var(--transition-fast)' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={40} className="animate-spin" style={{ marginBottom: '16px' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading AI Interview Room...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error && !interview) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color var(--transition-fast)' }}>
        <div style={{ maxWidth: '540px', width: '100%', backgroundColor: 'var(--bg-surface)', padding: '36px', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--error-text)', marginBottom: '16px' }}>
            <AlertCircle size={28} />
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>Interview Room Unavailable</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
            {error || 'The requested interview session could not be found. It may have expired or belongs to another candidate.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setError(''); setLoading(true); fetchInterview(); }}
              style={{ padding: '10px 18px', backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
            >
              Retry Connection
            </button>
            <Link
              to="/interview/setup"
              style={{ padding: '10px 18px', backgroundColor: 'var(--primary)', color: '#ffffff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}
            >
              Start New Interview
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Live Coding Interview Round: render dedicated Monaco-based Live Coding Studio
  if (isLiveCoding && interview) {
    const currentQ = interview.questions?.[interview.currentQuestionIndex];
    return (
      <LiveCodingStudio
        interview={interview}
        currentQ={currentQ}
        currentQuestionIndex={interview.currentQuestionIndex}
        totalQuestions={interview.totalQuestions}
        evaluation={evaluation}
        onEvaluationReceived={(evalData, updatedInterview) => {
          setEvaluation(evalData);
          setInterview(updatedInterview);
        }}
        onProceed={handleProceed}
        advancing={advancing}
        serverClockOffset={serverClockOffset}
        nowTs={nowTs}
        user={user}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', transition: 'background-color var(--transition-fast), color var(--transition-fast)' }}>
      
      {/* Pre-Interview Device Permission & Setup Modal */}
      <DeviceCheckModal
        isOpen={showDeviceModal}
        onJoinRoom={handleJoinRoom}
        micPermission={micPermission}
        cameraPermission={cameraPermission}
        cameraError={cameraError}
        cameraStream={cameraStream}
        isCameraOn={isCameraOn}
        isMicMuted={isMicMuted}
        onToggleCamera={handleToggleCamera}
        onToggleMic={handleToggleMic}
        audioLevel={audioLevel}
        sessionLanguage={sessionLanguage}
        onLanguageChange={handleLanguageChange}
        onSkipToTextMode={handleSkipToTextMode}
      />

      {/* Top Meeting Header Bar */}
      <header style={{
        backgroundColor: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '12px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        transition: 'background-color var(--transition-fast)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* Left: Exit + Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link
              to="/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 500,
                padding: '5px 10px',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <ArrowLeft size={15} /> Exit
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {interview?.category}
              </span>
              <span style={{
                backgroundColor: interview?.difficulty === 'Hard' ? 'rgba(239,68,68,0.15)' : interview?.difficulty === 'Medium' ? 'rgba(168,85,247,0.15)' : 'rgba(34,197,94,0.15)',
                color: interview?.difficulty === 'Hard' ? '#f87171' : interview?.difficulty === 'Medium' ? '#c084fc' : '#4ade80',
                padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600
              }}>
                {interview?.difficulty}
              </span>
              {interview?.targetRole && (
                <span style={{ backgroundColor: 'rgba(234,179,8,0.12)', color: 'var(--warning-text)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 500, border: '1px solid rgba(234,179,8,0.25)' }}>
                  {interview.targetRole}
                </span>
              )}
              {currentQ?.isAdaptiveFollowUp && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8',
                  padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 600, border: '1px solid rgba(56, 189, 248, 0.3)'
                }}>
                  <Brain size={12} /> Adaptive Follow-Up
                </span>
              )}
            </div>
          </div>

          {/* Right: Timers + Progress + Minimap */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isTimedMode ? (
                <div
                  title={`Per-question time remaining (${timeLimit}s limit)`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    fontSize: '0.82rem', color: timerColor, fontWeight: 700,
                    backgroundColor: remainingSeconds <= 15 ? 'rgba(239,68,68,0.12)' : 'var(--bg-card-subtle)',
                    padding: '3px 8px', borderRadius: '6px', border: `1px solid ${timerColor}`
                  }}
                >
                  <Clock size={13} />
                  <span>{formatTime(remainingSeconds)}</span>
                  <span style={{ fontSize: '0.68rem', opacity: 0.8 }}>left</span>
                </div>
              ) : (
                <div
                  title="Elapsed time on current question"
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: timerColor, fontWeight: 600 }}
                >
                  <Clock size={13} />
                  <span>{formatTime(questionElapsed)}</span>
                </div>
              )}

              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }} title="Total interview duration">
                Total: {formatTime(totalSessionElapsed)}
              </span>
            </div>

            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Question <strong style={{ color: 'var(--primary-text)' }}>{questionNumber}</strong> of {totalQuestions}
            </span>

            {/* Dot minimap */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              {questionDots.map((dot, i) => (
                <div
                  key={i}
                  title={`Question ${i + 1}${dot.evaluated ? ': Score ' + dot.score + '/10' : dot.isCurrent ? ': Current' : ': Pending'}`}
                  style={{
                    width: dot.isCurrent ? '10px' : '7px',
                    height: dot.isCurrent ? '10px' : '7px',
                    borderRadius: '50%',
                    backgroundColor: dot.dotColor,
                    border: dot.isCurrent ? '2px solid var(--primary-text)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Room Arena */}
      <main style={{ flex: 1, padding: '20px 24px 100px 24px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
        
        {/* Adaptive Context Banner (if active follow-up) */}
        {(currentQ?.isFollowUp || currentQ?.isAdaptiveFollowUp) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(168, 85, 247, 0.12)',
            border: '1px solid rgba(168, 85, 247, 0.35)',
            borderRadius: '10px',
            padding: '10px 18px',
            marginBottom: '16px',
            fontSize: '0.85rem',
            color: '#c084fc',
            boxShadow: '0 2px 10px rgba(168, 85, 247, 0.08)'
          }}>
            <Sparkles size={18} color="#c084fc" />
            <span><strong>🎯 Smart Follow-Up Probe:</strong> {currentQ.adaptiveReason || 'Targeted deep-dive based directly on your last answer. Probing trade-offs, internal mechanisms, or edge cases.'}</span>
          </div>
        )}

        {/* Video Call Dual Pane Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Tile 1: AI Technical Interviewer */}
          <AIAvatarTile
            interviewerState={interviewerState}
            currentQuestionText={currentQ?.questionText || ''}
            questionNumber={questionNumber}
            totalQuestions={totalQuestions}
            category={interview?.category}
            topic={currentQ?.topic}
            difficulty={currentQ?.difficulty}
            onReplayQuestion={handleReplayQuestion}
            isSpeaking={isSpeaking}
            isPaused={isPaused}
            activeVoiceName={voiceManager.getActiveVoiceName(sessionLanguage)}
          />

          {/* Tile 2: Candidate Webcam & Audio Preview */}
          <CandidateVideoTile
            stream={mediaStream}
            cameraStream={cameraStream}
            isCameraOn={isCameraOn}
            isMicMuted={isMicMuted}
            isListening={isListening}
            isAiSpeaking={isSpeaking}
            isPaused={isPaused}
            micPermission={micPermission}
            cameraPermission={cameraPermission}
            cameraError={cameraError}
            audioLevel={audioLevel}
            candidateName={user?.name || 'Candidate'}
          />
        </div>

        {/* Coding Constraints & Hints (if applicable) */}
        {currentQ?.codingDetails?.constraints && currentQ.codingDetails.constraints.length > 0 && (
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)'
          }}>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Constraints:</strong>
            <ul style={{ margin: 0, paddingLeft: '18px' }}>
              {currentQ.codingDetails.constraints.map((c, i) => <li key={i}><code>{c}</code></li>)}
            </ul>
          </div>
        )}

        {/* Error Alert Bar */}
        {error && (
          <div className="auth-alert-error" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={handleRetryEvaluation}
              disabled={submitting}
              style={{
                backgroundColor: 'var(--error)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: submitting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
              Retry Evaluation
            </button>
          </div>
        )}

        {/* Speech Error Notice with Retry & Text Fallback */}
        {speechError && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: '10px 16px',
            marginBottom: '16px',
            fontSize: '0.82rem',
            color: '#f87171',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={16} />
              <span>{speechError}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleRetrySpeech}
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#f87171',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Retry Microphone
              </button>
              <button
                type="button"
                onClick={() => { setShowTextFallback(true); setSpeechError(''); }}
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Type Instead
              </button>
              <button
                type="button"
                onClick={() => setSpeechError('')}
                style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontWeight: 700 }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Response Stage: Real-Time Editable Transcript or Evaluation Review */}
        {!evaluation ? (
          <form onSubmit={handleSubmitAnswer} style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '20px'
          }}>
            {/* Header row of response box */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  Candidate Live Response & Transcript
                </span>
                {isListening && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    color: '#4ade80',
                    fontSize: '0.72rem',
                    fontWeight: 600
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', animation: 'pulse 1s infinite' }} />
                    Listening live...
                  </span>
                )}
                {interimText && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary-text)', fontStyle: 'italic' }}>
                    "{interimText}..."
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <select
                  value={sessionLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  disabled={isListening}
                  aria-label="Speech recognition language"
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    cursor: isListening ? 'not-allowed' : 'pointer'
                  }}
                >
                  <option value="en-US">English (US)</option>
                  <option value="hi-IN">Hindi (हिंदी)</option>
                  <option value="en-IN">English (India)</option>
                  <option value="en-GB">English (UK)</option>
                </select>
                <span>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>•</span>
                <span>{answer.length} chars</span>
              </div>
            </div>

            {/* Language Notice Banner (if native voice fallback or alert) */}
            {languageNotice && (
              <div style={{
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '8px',
                padding: '8px 12px',
                marginBottom: '10px',
                fontSize: '0.75rem',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <span>{languageNotice}</span>
                <button
                  type="button"
                  onClick={() => setLanguageNotice('')}
                  style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Editable Transcript Text Area */}
            <textarea
              id="candidateTranscript"
              rows={5}
              value={answer}
              onChange={(e) => {
                const val = e.target.value;
                setAnswer(val);
                committedTranscriptRef.current = val;
                currentSessionFinalRef.current = '';
                currentSessionInterimRef.current = '';
                finalTranscriptRef.current = val;
                setInterimText('');
              }}
              placeholder="Speak using your microphone or type your technical response here. Cover internal mechanisms, edge cases, and production trade-offs..."
              disabled={submitting}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-input)',
                border: isListening ? '1px solid #22c55e' : '1px solid var(--border-subtle)',
                borderRadius: '12px',
                padding: '14px 18px',
                color: 'var(--text-primary)',
                fontSize: '0.92rem',
                lineHeight: 1.6,
                fontFamily: 'inherit',
                resize: 'vertical',
                boxSizing: 'border-box',
                outline: 'none',
                boxShadow: isListening ? '0 0 10px rgba(34, 197, 94, 0.2)' : 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
              }}
            />

            {/* Hints Accordion */}
            {currentQ?.hints && currentQ.hints.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowHint(prev => !prev)}
                  style={{ background: 'none', border: 'none', color: 'var(--warning-text)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}
                >
                  <Lightbulb size={13} />
                  {showHint ? 'Hide Technical Hint' : 'Need a Hint?'}
                </button>
                {showHint && (
                  <div style={{ marginTop: '6px', padding: '10px 14px', backgroundColor: 'var(--warning-subtle)', border: '1px solid var(--warning)', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--warning-text)' }}>
                    {currentQ.hints.join(' ')}
                  </div>
                )}
              </div>
            )}

            {/* Action Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <button
                type="button"
                onClick={handleSkip}
                disabled={submitting}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                <SkipForward size={14} />
                <span>Skip Question</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Clear Transcript Button */}
                <button
                  type="button"
                  onClick={handleClearTranscript}
                  disabled={submitting || (!answer && !interimText)}
                  title="Clear transcript"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '9px 14px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border-subtle)',
                    color: !answer ? 'var(--text-muted)' : 'var(--text-secondary)',
                    cursor: !answer ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                  <span>Clear</span>
                </button>

                <button
                  type="button"
                  onClick={toggleListening}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    backgroundColor: isListening ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-subtle)',
                    border: isListening ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border-subtle)',
                    color: isListening ? '#f87171' : 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {isListening ? <MicOff size={15} /> : <Mic size={15} color="#22c55e" />}
                  <span>{isListening ? 'Pause Mic' : 'Resume Mic'}</span>
                </button>

                <Button
                  type="submit"
                  disabled={submitting || !answer.trim()}
                  variant="primary"
                  style={{ minWidth: '200px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Evaluating Answer...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Answer</span>
                      <Send size={15} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          /* Evaluation Review Card */
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '28px',
            boxShadow: 'var(--shadow-card)',
            animation: 'fadeIn 0.3s ease-in'
          }}>
            {/* Interviewer Persona Human Reaction */}
            {(currentQ?.interviewerReaction || evaluation?.interviewerReaction) && (
              <div style={{
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(99, 102, 241, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={16} color="#818cf8" />
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Interviewer ({interview?.companyStyle || 'Company Practice'})
                  </div>
                  <div style={{ fontSize: '0.94rem', color: 'var(--text-primary)', fontStyle: 'italic', marginTop: '2px' }}>
                    "{currentQ?.interviewerReaction || evaluation?.interviewerReaction}"
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '20px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--success-text)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  <FileCheck2 size={16} /> Technical Answer Evaluated
                </div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                  {evaluation.feedback}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <ScoreRing score={evaluation.score} size={96} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>out of 10</span>
              </div>
            </div>

            {/* Strengths & Missing Concepts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginBottom: '18px' }}>
              <div style={{ backgroundColor: 'var(--success-subtle)', border: '1px solid var(--success)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success-text)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '10px' }}>
                  <CheckCircle2 size={16} /> Key Strengths
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
                  {evaluation.strengths?.map((str, i) => <li key={i}>{str}</li>)}
                </ul>
              </div>

              <div style={{ backgroundColor: 'var(--error-subtle)', border: '1px solid var(--error)', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--error-text)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '10px' }}>
                  <XCircle size={16} /> Missing Concepts / Gaps
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
                  {evaluation.missingConcepts?.map((mis, i) => <li key={i}>{mis}</li>)}
                </ul>
              </div>
            </div>

            {/* Misconceptions & Corrections (if detected) */}
            {Array.isArray(evaluation.incorrectStatements) && evaluation.incorrectStatements.length > 0 && (
              <div style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontSize: '0.86rem', fontWeight: 700, marginBottom: '8px' }}>
                  <AlertTriangle size={16} /> Misconceptions Detected & Corrections
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {evaluation.incorrectStatements.map((stmt, i) => (
                    <div key={i} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.82rem' }}>
                      <div style={{ color: '#ef4444', fontWeight: 600 }}>⚠️ Claim: {stmt}</div>
                      {evaluation.corrections?.[i] && (
                        <div style={{ color: '#22c55e', fontWeight: 500, marginTop: '2px' }}>✓ Correction: {evaluation.corrections[i]}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Model Answer Guard during active session */}
            <div style={{ backgroundColor: 'var(--bg-card-subtle)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Lock size={14} />
              <span>Model answers and comprehensive reference solutions are withheld during the live interview and will be revealed on the final assessment results screen.</span>
            </div>

            {/* Actionable Suggestions */}
            {Array.isArray(evaluation.suggestions) && evaluation.suggestions.length > 0 && (
              <div style={{ backgroundColor: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.25)', borderRadius: '10px', padding: '14px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0ea5e9', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
                  <Target size={16} /> How to Improve
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-primary)', fontSize: '0.83rem', lineHeight: 1.6 }}>
                  {evaluation.suggestions.map((sug, i) => <li key={i}>{sug}</li>)}
                </ul>
              </div>
            )}

            {/* Next Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={handleProceed}
                variant="primary"
                disabled={advancing}
                style={{ minWidth: '220px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {advancing ? (
                  <><Loader2 size={18} className="animate-spin" /><span>Advancing...</span></>
                ) : interview?.status === 'completed' || isLastQuestion ? (
                  <><span>View Final Assessment Results</span><Award size={18} /></>
                ) : (
                  <><span>Next Question Aloud</span><ArrowRight size={17} /></>
                )}
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Control Dock */}
      <footer style={{
        position: 'fixed',
        bottom: '20px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
        pointerEvents: 'none'
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <RoomControlDock
            isMicMuted={isMicMuted}
            onToggleMic={handleToggleMic}
            isCameraOn={isCameraOn}
            onToggleCamera={handleToggleCamera}
            isPaused={isPaused}
            onTogglePause={handleTogglePause}
            onEndInterview={handleEndInterview}
            showTextFallback={showTextFallback}
            onToggleTextFallback={() => setShowTextFallback(prev => !prev)}
            onReplayQuestion={handleReplayQuestion}
            isSpeaking={isSpeaking}
            disabled={submitting || advancing}
          />
        </div>
      </footer>
    </div>
  );
};

export default InterviewSession;
