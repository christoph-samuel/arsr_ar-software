export async function speech2text() {
    try {
        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        // var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
        // var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

        let recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.lang = 'de'
        recognition.interimResults = true
        recognition.maxAlternatives = 0

        recognition.start()

        // this.message = "Bitte sprechen ..."
        // console.log("Message:", this.message)
        console.log('Ready to receive a command.')

        let input

        recognition.onresult = function (event) {
            input = event.results[event.results.length - 1][0].transcript
            console.log("Input:", input)
            console.log("Results:", event.results)
            // console.log(event.results.length)

            if (event.results[event.results.length - 1].isFinal) {
                if (input.match(/Weiter\.*/i)) {
                    console.log('Case: ', 'Weiter')
                    // newThis.navigate(1)
                    return 1
                } else if (input.match(/Zurück\.*/i)) {
                    console.log('Case: ', 'Zurück')
                    // newThis.navigate(-1)
                    return -1
                }
            }
            setTimeout(() => {
                try {
                    recognition.start()
                } catch {
                    console.log("Speech recognition already started!")
                }
            }, 50)
        }

        recognition.onspeechend = function () {
            // this.message = ""
            // console.log("Message:", this.message)
            speech2text()
        }

        recognition.onerror = function (event) {
            // newThis.message = "Error in speech recognition occured, please reload the page!"
            console.log('Error occurred in recognition: ', +event.error)
            // newThis.error = event.error
            // newThis.error = "Error in speech recognition occured, please reload the page!"
            speech2text()
        }
    } catch (e) {
        // this.error = e.message
        console.log(e.message)
        // this.error = "Spracherkennung wird nicht unterstützt!"
    }
}