const originalConsoleError = console.error

export function suppressActWarnings() {
    beforeEach(() => {
        console.error = (message, ...data) => {
            if (message.includes("not wrapped in act")) {
                return
            }

            originalConsoleError(message, ...data)
        }
    });

    afterEach(() => {
        console.error = originalConsoleError
    });
}
