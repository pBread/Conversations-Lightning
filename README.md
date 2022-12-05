# Twilio Conversations for Salesforce

_This project was created using [Salesforce DX](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_ws_create_new.htm)_

[Twilio Conversations](https://www.twilio.com/docs/conversations) is the backbone of text-based communication across [Twilio Frontline](https://www.twilio.com/frontline) and [Twilio Flex](https://www.twilio.com/flex). There's a lot of valuable information in those conversations. This [Salesforce Lightning Component](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/intro_components.htm) allows your Salesforce users to view the conversations your customers are having with those agents – with proper security controls, of course – directly from the Salesforce Contact record.

## Implementation

Twilio Conversations for Salesforce is an [open source](./LICENSE) project and unmanaged Salesforce AppExchange app. It's ready to be used out of the box but also provides you with the ability customize as much as you'd like.

### Approach 1: Install the AppExchange Unmanaged Package

The easiest way to get started is to simply install the unmanaged Salesforce AppExchange and add the Lightning Component to the Contact record page Layout.

#### Step 1: Login to your Salesforce Environment

#### Step 2: Copy & paste this link into your browser

```
https://app.install.placeholder.com
```

#### Step 3: Add the Lightning Component to the Contact Record Page Layout

<img src="./misc/add-lgt-comp.gif" height="300"/>

### Approach 2: Deploy with Salesforce DX

If you would like to customize the application, you can download this repository and deploy your own application using the Salesforce DX CLI.

#### (Prerequisites) Install Salesforce DX CLI

[Install the Salesforce CLI](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm)

### Step 1: Clone Repo

```
git clone https://github.com/pBread/Conversations-Lightning.git;
cd Conversations-Lightning;
npm install;
```

### Step 2: Login to Salesforce Org with Salesforce CLI

```
sf login
```

### Step 3: Deploy

```
npm run deploy
```
