const fs = require('fs');

describe('Protractor Demo App', function() {

  it('should have a title @Regression @Smoke @Something', async   function() {
    let EC = await protractor.ExpectedConditions;
    let button= await element(by.css('a[data-cookie-set="accept"]'));
    let isClickable = await EC.elementToBeClickable(button);
    await browser.get('https://www.noah-conference.com/noah-berlin-conference-2019/speaker-and-highlights/');
    await element(by.css('button[title="Close"]')).click();
    await browser.wait(isClickable, 5000);
    await browser.actions().mouseMove(button).click().perform();
    //await element(by.css('a[data-cookie-set="accept"]')).click()

    let a= await element.all(by.css('section#speakers>div'));
    console.log("total presenters:"+a.length);


  let b= await a[0].all(by.css('a'));
  let c=await b[1].getText();
  console.log(c);



  let name;
  let position;
  let company;
  let presence=true;
  let stream = fs.createWriteStream("append.csv", {flags:'a'});

  for(i=0;i<=(a.length-2);++i){
        console.log("This is the speaker no: "+ (i+1));


        presence=await a[i].element(by.css('div.speaker-name>a')).isPresent();

        console.log(presence);

        if(presence===true){
        name=await await a[i].element(by.css('div.speaker-name>a')).getAttribute('textContent');
        name= name.trim();
      }else{
        name=await await a[i].element(by.css('div.speaker-name')).getAttribute('textContent');
        name= name.trim();
      }

      presence=await a[i].element(by.css('div.speaker-position')).isPresent();

      console.log(presence);

        if(presence===true){
        position=await a[i].element(by.css('div.speaker-position')).getAttribute('textContent');
        position=position.trim();
      }else{
        position="Not Avaiable";
        await browser.sleep(4000);
      }


      presence=await a[i].element(by.css('div.speaker-company>a>img')).isPresent();
      console.log(presence);

        if(presence===true){
        company=await a[i].element(by.css('div.speaker-company>a>img')).getAttribute('alt');
      }else{
        presence=await a[i].element(by.css('div.speaker-company>a>span')).isPresent();
            if(presence===true){
                  company=await a[i].element(by.css('div.speaker-company>a>span')).getAttribute('textContent');
                  company=company.trim();
          }else {
                  company="Not Avaiable";
                  await browser.sleep(4000);
      }
      }



        
        await stream.write(name.replace(/"/g,'""')+ ","+position.replace(/"/g,'""')+","+company.replace(/"/g,'""')+"\n");




        console.log("Name of the speaker is: "+ name );
        console.log("Position of the speaker is: " + position);
        console.log("Company of the speaker is: "+company);
    }
    stream.end();
  });


});
