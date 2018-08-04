"use strict";

const config = require("./config").config;
const ynab = require("ynab");
const numeral = require("numeral");
const R = require("ramda");
const fs = require("fs");
const moment = require("moment");
const Handlebars = require("handlebars");
const sender = require("gmail-send")({});

const ynabAPI = new ynab.API(config.ynabAccessToken);

const filterCategories = R.filter(
  R.pipe(
    R.prop("name"),
    R.contains(R.__, config.includedCategoryGroups)
  )
);

(async function() {
  const categoriesResponse = await ynabAPI.categories.getCategories(config.budgetId);

  const filteredCategories = filterCategories(categoriesResponse.data.category_groups);

  Handlebars.registerHelper("milli_currency", x => numeral(x / 1000).format("$0,0.00"));
  const emailTemplate = fs.readFileSync("email-template.tpl", {encoding: "utf8"});
  const template = Handlebars.compile(emailTemplate);
  const today = moment(new Date()).format("ddd MMM D, YYYY");
  const context = {category_groups: filteredCategories, today};
  
  sender({
    user: config.gmail.user,
    pass: config.gmail.pass,
    to: config.gmail.user,
    subject: "Daily budget snapshot",
    html: template(context),
    text: "Must use HTML view"
  }, (err, res) => {
    if (err) {
      console.log(`ERROR Unable to send ${err}`);
      return;
    }

    console.log(`Send complete: ${res}`);
  });
})();