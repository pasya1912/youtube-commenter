const puppeteer = require('puppeteer');

var keyword = "Free fire";//masukkan keyword disini


  (async () => {
    const browser = await puppeteer.launch({
      //defaultViewport: null,
      devtools: true,
      headless: false,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      // args: ['--profile-directory="Profile 1"'],
      userDataDir:"C:\Users\[user]\AppData\Local\Google\Chrome\User Data\Profile 1"
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768});
    await page.goto('https://www.youtube.com/results?search_query='+keyword);
    await page.bringToFront();
    //let cok = await page.$eval("#", el => el);
    
   // console.log(cok);
   await page.evaluate(() => {
  
    window.scrollBy(0, 200000);
  
  });
  await page.waitForTimeout(7000)
  
  
    const linked = await page.$$('#video-title');

    console.log(Object.keys(linked));
    var link = linked.filter(function (el) {
      return el != null;
    });
    
  console.log("Jumlah Link : ",link.length);

  for (i in link) {
    const tweet = await (await (await link[i].getProperty('href')).jsonValue());
    console.log(tweet);
    const pages = await browser.newPage();
    try{
    await pages.goto(tweet);
    await pages.bringToFront();
    await page.waitForTimeout(4000)
    await pages.evaluate(() => {

      window.scrollBy(0, 200000);

    });
try {

await pages.waitForSelector("#message > span", {timeout: 4000});
console.log("Gabisa Comment");
await pages.close();
}catch{
await pages.waitForSelector("#simplebox-placeholder", {timeout: 30000});


await pages.evaluate(() => {
  function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}
  document.querySelector("#simplebox-placeholder").click()
  document.querySelector("div[id='contenteditable-root']").innerHTML = "Hi Follow my Instagram Dong !!, ID : "+makeid(10);
  console.log(document.querySelector("div[id='contenteditable-root']").innerHTML);
});
pages.keyboard.press('Enter');
await pages.evaluate(() => {
  document.querySelector("#submit-button").click()
});
await page.waitForTimeout(4000);
await pages.close();
console.log("Sukses Comment");

}
}catch{
  await pages.close();
console.log("Gabisa Dibuka link ytnya")
}
  }






    console.log("Sudah Comment ke semua Video !");
  
  await page.close();
  process.exit()
  
  }
  )();
