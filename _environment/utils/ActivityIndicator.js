const writeLine = require('./writeLine');
const rewriteLine = require('./rewriteLine');

class ActivityIndicator {
  constructor(_ = ActivityIndicator.defaults) {
    const settings = Object.assign({}, ActivityIndicator.defaults, _);
    this.animate = false;
    this.message = settings.message;
    this.frames = settings.frames;
    this.active = true;
    this.rewrites = 0;
    this.frame = 0;
    this.prefixLoader = settings.prefixLoader;
    this.interval = undefined;
    this.fps = settings.fps;
    this.start();
  }

  start() {
    this.animate = true;
    this.interval = setInterval(() => {
      if (this.animate) {
        this.updateFrame();
      }
      this.write();
    }, 1000 / this.fps);
  }

  updateFrame() {
    this.frame = this.frame === this.frames.length - 1 ? 0 : this.frame + 1;
  }

  write() {
    const frame = this.frames[this.frame];
    const text = `${this.prefixLoader ? frame + ' ' : this.message}${
      this.prefixLoader ? this.message : frame
    }`;
    if (this.rewrites++ === 0) {
      writeLine(text);
    } else {
      rewriteLine(text);
    }
    process.stderr.write('\x1B[?25l');
  }

  stop() {
    this.frame = 0;
    this.animate = false;
    clearInterval(this.interval);
    process.stderr.write('\x1B[?25h');
  }
}

ActivityIndicator.defaults = {
  message: '',
  frames: ['', '.', '..', '...'],
  fps: 30,
  prefixLoader: false,
};

module.exports = ActivityIndicator;
