function getDefaultSettings() {
    return {
        display: {
            theme: 'light',
            fontSize: 'medium'
        },
        account: {
            autoSave: true
        }
    };
}

function getTheme() {
    let settings = getCurrentSettings(); // Load settings from localStorage
    if(!settings) return ;
    theme = settings.display.theme;
    return theme;
}

function getThemeMode() {
    let theme = getTheme();

    if(theme === 'auto'){
        return prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
}

function applyTheme(theme) {

    theme = theme || getThemeMode(); // always dark or light

    const html = document.documentElement;
    if (theme === 'dark') {
        // dark theme when applied
        html.style.colorScheme = 'dark';
        document.body.classList.add('theme-dark');
    } else if (theme === 'light') {
        // light theme when applied
        html.style.colorScheme = 'light';
        document.body.classList.remove('theme-dark');
    }
    //  else if (theme === 'auto') {
    //     // browser theme when applied
    //     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //     applyTheme(prefersDark ? 'dark' : 'light');
    // }
}

function applyFontSize(fontSize) {
   if(!fontSize){
       let settings = getCurrentSettings();
       fontSize = settings.display.fontSize;
   }
   
   if(fontSize === 'small'){
        document.documentElement.style.fontSize = '14px'
        document.body.fontSize = '12px'
    }else if(fontSize === 'medium'){
       document.documentElement.style.fontSize = 'initial'
       document.body.fontSize = 'initial'
   } else if (fontSize === 'large'){
        document.documentElement.style.fontSize = '18px'
        document.body.fontSize = '16px'
   }
}

applyFontSize();
applyTheme();

window.addEventListener('visibilitychange', function() {
    if(document.visibilityState === 'visible'){
        applyTheme();
        applyFontSize();
    }
})