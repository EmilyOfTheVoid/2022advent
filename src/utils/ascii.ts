import figlet from 'figlet';
import chalk from 'chalk';

export const ascii = (message: string): void => {
    console.log(chalk.green(
        figlet.textSync(message, {
            font: 'bubble',
            horizontalLayout: "default",
            verticalLayout: "default"
        })
    ));
};

export const asciiSmall = (message: string): void => {
    console.log(chalk.red(
        figlet.textSync(message, {
            font: 'digital',
            horizontalLayout: "default",
            verticalLayout: "default"
        })
    ));
};