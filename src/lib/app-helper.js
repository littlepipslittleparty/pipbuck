// src/app-helper.js
import Shake from 'shake.js';

export function mounted() {
    // watch colorFront and colorBack to update the <body> element styles.
    this.$watch(
        'colorFront',
        // eslint-disable-next-line prefer-arrow-callback
        function watchColorFront(newColor) {
            document.body.style.color = newColor;
        },
        {immediate: true},
    );
    /* this.$watch(
      'colorBack',
      // eslint-disable-next-line prefer-arrow-callback
      function watchColorBack(newColor) {
        document.body.style.backgroundColor = newColor;
      },
      { immediate: true },
    ); */
    // event listeners
    this.shake_instance = new Shake({
        threshold: 15, // optional shake strength threshold
        timeout: 1000, // optional, determines the frequency of event generation
    });
    this.shake_instance.start();
    window.addEventListener('orientationchange', this.updateHardwareButtonPosition.bind(this));
    window.addEventListener('keyup', (event) => {
        // If a special navigation key was pressed...
        /*
        h:         Display Help.
        q|tab:     Quit.
        a|s:       STATS button.
        b|i:       ITEMS button.
        c|d:       DATA  button.
        1-5:       Select Tabs.
        +|up:      Scroll up.
        -|down:    Scroll down.
        8-0: Change colors.
         */
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
        if (event.key === 'a' || event.key === 's') {
            this.$router.push({name: 'Stats'});
        } else if (event.key === 'b' || event.key === 'i') {
            this.$router.push({name: 'Items'});
        } else if (event.key === 'c' || event.key === 'd') {
            this.$router.push({name: 'Data'});
        } else if (event.key === '.' || event.key === 'Escape') {
            this.$router.push({name: 'Boot'});
        } else if (event.key === ',' || event.key === 'p') {
            this.$router.push({name: 'Settings'});
        } else if (event.key === 'm') {
            this.$router.push({name: 'Local Map'});
        } else if (event.key === 'h') {
            this.$router.push({name: 'About'});
        } else if (event.key === 'r') {
            this.$router.push({name: 'Radio'});
        } else if (event.key === '+' || event.key === 'ArrowUp') {
            this.$broadcast('navigate-UP');
        } else if (event.key === '-' || event.key === 'ArrowDown') {
            this.$broadcast('navigate-DOWN');
        } else if (event.key === '<' || event.key === 'ArrowLeft') {
            this.$broadcast('navigate-LEFT');
        } else if (event.key === '>' || event.key === 'ArrowRight') {
            this.$broadcast('navigate-RIGHT');
        }
    });
}

export function beforeDestroy() {
    if (this.scroll_prevent !== null) {
        this.shake_instance.stop();
        this.shake_instance = null;
    }
    window.removeEventListener('orientationchange', this.updateHardwareButtonPosition.bind(this));
}

export function mapButtonPositionToFlex(hardwareButtonPosition) {
    switch (hardwareButtonPosition) {
        case 'top':
            return 'column-reverse';
        case 'left':
            return 'row-reverse';
        case 'right':
            return 'row';
        case 'bottom':
        default:
            return 'column';
    }
}

export function calcHwBtnPosition(orientation) {
    if (orientation !== undefined) {
        switch (orientation) {
            default:
            case 'portrait-primary':
                return 'bottom';
            case 'landscape-primary':
                return 'right';
            case 'landscape-secondary':
                return 'left';
            case 'portrait-secondary':
                return 'top';
        }
    } else {
        switch (window.orientation) {
            default:
            case 0:
                return 'bottom';
            case 90:
                return 'left';
            case -90:
                return 'right';
            case 180:
                return 'top';
        }
    }
}
