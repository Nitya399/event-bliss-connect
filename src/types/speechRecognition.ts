
export interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
    item(index: number): SpeechRecognitionResult;
    length: number;
  };
}

export interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
  length: number;
}

export interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export interface SpeechRecognitionInterface extends EventTarget {
  continuous: boolean;
  grammars: any;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudioend: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onaudiostart: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onend: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onnomatch: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognitionInterface, ev: SpeechRecognitionEvent) => any) | null;
  onsoundend: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onsoundstart: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognitionInterface, ev: Event) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

// Define a constructor interface
export interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInterface;
}
