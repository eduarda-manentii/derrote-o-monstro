new Vue({
  el: '#app',
  data: {
    running: false,
    playerLife: 100,
    monsterLife: 100,
    logs: [],
    healCount: 5,
    maxHealCount: 5,
    attackCount: 0,
    attackSpecialProgress: 0
  },
  computed: {
    hasResult() {
      return this.playerLife <= 0 || this.monsterLife <= 0;
    }
  },
  methods: {
    startGame() {
      this.running = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
      this.healCount = this.maxHealCount;
      this.attackCount = 0;
      this.attackSpecialProgress = 0;
    },
    attack(especial) {
      this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
      if(this.monsterLife > 0) {
        this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        this.attackCount++;
      }

      if(!especial) {
        if(this.attackSpecialProgress < 100) {
          this.attackSpecialProgress += 20;
        }
      } else {
        this.attackSpecialProgress = 0;
      }
    },
    hurt(atr, min, max, especial, source, target, cls) {
      const plus = especial ? 5 : 0
      const hurt = this.getRandom(min + plus, max + plus)
      this[atr] = Math.max(this[atr] - hurt, 0)
      this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
    },
    healAndHurt() {
      if (!this.healButtonDisabled) {
        this.heal(10, 15);
        this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster');
        this.healCount--;
      }
    },
    heal(min, max) {
      const heal = this.getRandom(min, max)
      this.playerLife = Math.min(this.playerLife + heal, 100)
      this.registerLog(`Jogador ganhou força de ${heal}.`, 'player')
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min
      return Math.round(value)
    },
    registerLog(text, cls) {
      this.logs.unshift({ text, cls })
    },
    buttonEspecialAttackDisabled() {
      return this.attackSpecialProgress < 100;
    },
    healRemaining() {
      return this.healCount;
    },
    buttonHealDisabled() {
      return this.healCount <= 0 || this.healCount > this.maxHealCount;
    }
  },
  watch: {
    hasResult(value) {
      if (value) this.running = false;
    }
  }
})
