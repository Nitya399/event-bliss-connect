
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
                               (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        if (recognitionRef.current) {
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = 'en-US';
          
          recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript;
            console.log("Speech recognition result:", transcript);
            onTranscript(transcript);
          };
          
          recognitionRef.current.onerror = (event: any) => {
            console.error("Speech recognition error:", event);
            setIsListening(false);
            toast.error("Couldn't access microphone. Please ensure you've granted permission.");
          };
          
          recognitionRef.current.onend = () => {
            console.log("Speech recognition ended");
            setIsListening(false);
          };
        }
      } else {
        console.warn("Speech Recognition not supported in this browser");
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (error) {
          console.error("Error aborting speech recognition:", error);
        }
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
        console.log("Stopping speech recognition");
      } catch (error) {
        console.error("Error stopping speech recognition:", error);
      }
    } else {
      try {
        recognitionRef.current.start();
        console.log("Starting speech recognition");
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
