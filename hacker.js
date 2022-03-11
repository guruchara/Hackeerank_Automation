
                //    Radha Swami JI
          
// require puppeteer
const puppeteer = require('puppeteer');
const code = require('./code');

const codefile = require('./code')
console.log('Before');

//temp mail
let email = 'mewinet642@nitynote.com'
// password
let password = 'Automation@100'

let page;
// launching the browser
let browserlaunch = puppeteer.launch(
    {
        // by default website not visible if we assign false then it will visible
        headless: false,
        // when chromium open through the puppeteer then it will open in half size but i we write start maximized then it will open om fullscreen
        args: ['--start-maximized'],
        // by default width and height set by puppeteer but if we assign null then ..
        defaultViewport: null
    }
)

browserlaunch.then(function (browserInstance) {
    // by using newPage we will move on then next page
    let newtabBrowser = browserInstance.newPage()
    return newtabBrowser;
}).then(function (newtab) {
    page = newtab;
    //goto used for moving the given link
    let browseropen = page.goto("https://www.hackerrank.com/auth/login")
    return browseropen;
}).then(function () {
    // page.type method is use for typing on editor or board
    // {delay :50} by default unit is mili second  by using delay we can treat as code typed by human .. without delay also project work but problem is that smart companies software know how i man is 100% speed 😀
    let emailwillEnteredPromise = page.type('input[id=input-1]', email, { delay: 50 })
    return emailwillEnteredPromise;
}).then(function () {
    newxtab = page;
    let passwordEnter = newxtab.type('input[id=input-2]', password, { delay: 50 })
    return passwordEnter
}).then(function () {
    // here i use click for clicking the login button
    let loginButton = page.click('button[data-analytics="LoginPassword"]', { delay: 50 })
    return loginButton
}).then(function () {
    // select the algorithm section
    let algorithsecclick = waitandClick('a[data-cd-topic-slug="algorithms"]', page)
    return algorithsecclick
}).then(function () {
    // selecte the warmup bar 
    let warmupclick = waitandClick('input[value="warmup"]', page)
    return warmupclick;
}).then(function () {

    // allquestion is collection of question which are present on hackerrank
    let Allquestionarr = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', page)
    return Allquestionarr
    // console.log('Warmup section Clicked');
}).then(function (totalquestion) {
    // console.log('number of questions ' + totalquestion.length);
    // length of questionArray
    let questionwillbesolved = questionsolver(page, totalquestion[0], codefile.answers[0])
})

// waitandClick function is user defined function 
function waitandClick(selecter, cpage) {
    return new Promise(function (resolve, reject) {
        // by using waitForSelector  method we can control the loader
        let waitModalPromise = cpage.waitForSelector(selecter)

        waitModalPromise.then(function () {

            let clickmodal = cpage.click(selecter)
            return clickmodal;
            // if problem is resolved then is it will considered as resolve if not then catch blocke handle it.
        }).then(function () { resolve() }).catch(function () { reject() })
    })
}

function questionsolver(page, question, answer) {
    return new Promise(function (resolve, reject) {
        questionwillbelaunchpromise = question.click()
        questionwillbelaunchpromise.then(function () {
            // code edittor of hackeerank
            let waitForEditor = waitandClick('.monaco-editor.no-user-select.vs', page)
            return waitForEditor;
        }).then(function () {
            // input box
            return waitandClick('.checkbox-input', page)
        }).then(function () {
            // input box class
            return waitandClick('.input.text-area.custominput.auto-width', page)
        }).then(function () {
            // console.log('Text area');
            return page.type('.input.text-area.custominput.auto-width', answer, { delay: 20 })
        }).then(function () {
            //keyboard is pridefine method which is provided by puppeteer and puppeteer provided by Google
            // down command is use for select ctrl ... select complete code which is present in input box
            let ctrlpressed = page.keyboard.down("Control")
            return ctrlpressed
        }).then(function () {
            // press command is used for pressing or help in select code which is present in input box 
            let isPressedpromise = page.keyboard.press("A", { delay: 20 })
            return isPressedpromise;
        }).then(function () {
            // for cutting the code i press here x
            // when press x then cut the code
            let xispressedpromise = page.keyboard.press("X", { delay: 20 })
            return xispressedpromise
        }).then(function () {
            // up is generally used for unholding the select text
            let ctrlisreleased = page.keyboard.up("Control")
            return ctrlisreleased
            // from here i use github code
        }).then(function () {
            let waitForCodeAreaPromise = waitandClick(
                ".monaco-editor.no-user-select.vs",
                page
            );
            return waitForCodeAreaPromise;
        })
            .then(function () {
                let ctrlIsPressedPromise = page.keyboard.down("Control");
                return ctrlIsPressedPromise;
            })
            .then(function () {
                let AisPressedPromise = page.keyboard.press("A", { delay: 100 });
                return AisPressedPromise;
            }).then(function () {
                // for pasting the copied code in main edittor  the we will use V or press V command
                let XisPressedPromise = page.keyboard.press("V", { delay: 50 });
                return XisPressedPromise;
            }).then(function () {
                let ctrlIsReleasedPromise = page.keyboard.up("Control");
                return ctrlIsReleasedPromise;
            }).then(function () {
                // write the code in main edittor
                let runButtonClicked = page.click(' .hr-monaco__run-code', { delay: 50 })
                return runButtonClicked
            }).then(function () {
                // if our project is work fine then resolved 
                resolve()
                console.log('Hackerrank Automation Project Succesfull');
            }).catch(function (err) {
                // if not work properly the  it will generate error
                console.log(err)
            });
    })
}

console.log('After');