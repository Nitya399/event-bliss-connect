
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { SpeechRecognitionInterface, SpeechRecognitionConstructor, SpeechRecognitionEvent } from '@/types/speechRecognition';

interface UseSpeechRecognitionProps {
  onTranscript: (transcript: string) => void;
}

export const useSpeechRecognition = ({ onTranscript }: UseSpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInterface | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Define the Speech Recognition API with proper type casting
      const SpeechRecognition = (window as any).SpeechRecognition || 
                               (window as any).webkitSpeechRecognition as SpeechRecognitionConstructor;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          onTranscript(transcript);
        };
        
        recognitionRef.current.onerror = () => {
          setIsListening(false);
          toast.error("Couldn't access microphone. Please ensure you've granted permission.");
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        toast.error("Failed to start listening. Please try again.");
      }
    }
  };

  return {
    isListening,
    toggleListening,
  };
};
