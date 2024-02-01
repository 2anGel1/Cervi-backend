export class RecordNotFoundException extends Error {
    constructor(message: string) {
      super(message);
    }
  
    toObject() {
      return {
        message: this.message,
      };
    }
  }
  