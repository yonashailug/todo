export class Config {
    public static themes = [{
            themeName: 'themeWhite',
            className: 'theme--white',
            colorValue: '#fff'
        }, {
            themeName: 'themeCyan',
            className: 'theme--cyan',
            colorValue: '#a7ffeb'
        }, {
            themeName: 'themeYellowLight',
            className: 'theme--yellow-light',
            colorValue: '#ffff8d'
        }, {
            themeName: 'themeRedLight',
            className: 'theme--red-light',
            colorValue: '#ff8a80'
        }];
    public static defaultLabels: Array<string> = ['Inspiration', 'Personal', 'Work'];
    public static DB_PATH: string = 'todos';
    public static FORM_CONTROL_NAME: string = 'todos';
}
