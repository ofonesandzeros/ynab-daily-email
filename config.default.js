/**
 * This is the main configuration file for the ynab-daily-email.  Please rename
 * the file to config.js and provide the necessary configuration values.
 */
exports.config = {
    // Your YNAB personal access token
    ynabAccessToken: "",

    // The ID of the budget that you want to provide a daily email for
    budgetId: "",

    // Which category groups you want to include in your daily email
    includedCategoryGroups = [
        "Quality of Life Goals",
        "Just for Fun"
    ],

    // Your gmail configuration.  If using 2-factor auth, make sure to create
    // an application password for use here.
    gmail: {
        user: "",
        pass: ""
    }
};