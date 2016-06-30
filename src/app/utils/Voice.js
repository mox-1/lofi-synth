function Voice (context, dest, freq, {volume, oscType, attack, delay, sustain, release, frequency, resonance}) {
    this.context = context;
    this.frequency = freq;
    this.oscillators = [];
    this.destination = dest;
    this.attack = attack / 100;
    this.release = release / 100;
    this.sustain = sustain / 100;
    this.decay = delay / 100;
    this.oscType = oscType;
    this.volume = volume;
    this.filterFrequency = frequency * 20;
    this.filterResonance = resonance;
};

Voice.prototype.start = function() {
    var vco = this.context.createOscillator();
    vco.type = this.oscType;
    vco.frequency.value = this.frequency;


    /*Filter */
    var biquadFilter = this.context.createBiquadFilter();
    biquadFilter.type = 'lowpass';
    biquadFilter.frequency.value = this.filterFrequency;
    biquadFilter.Q.value = this.filterResonance;

    /* VCA */
    var vca = this.context.createGain();
    var now = this.context.currentTime;
    vca.gain.cancelScheduledValues(now);
    vca.gain.setValueAtTime(0, now);
    vca.gain.linearRampToValueAtTime(this.volume, now + this.attack);
    vca.gain.linearRampToValueAtTime(this.sustain, now + this.attack + this.decay);

    /* connections */
    vco.connect(biquadFilter);
    biquadFilter.connect(vca);
    vca.connect(this.destination);

    // vco.connect(vca);
    // vca.connect(this.destination);

    vco.start(0);
    this.oscillators.push(vca);
};


Voice.prototype.stop = function() {
    this.oscillators.forEach((oscillator) => {
        var now = oscillator.context.currentTime;
        oscillator.gain.cancelScheduledValues(now);
        oscillator.gain.setValueAtTime(0.5, now);
        oscillator.gain.linearRampToValueAtTime(0, now + this.release);
    });
};

export default Voice;
