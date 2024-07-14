## For testing only. On Progress. Will be deleted from my repo, and be push to Litecoin Foundation if the features all already work.
## Features:
| Task | Progress | 
|--------|--------|
| Send link verification via email to user who wants to sign up | Done | 
| Added User to SendGrid contact list after user get verified (they click button verify from email we sent) | Done | 
| Send template SendGrid about the user successfuly signed up after they get added to SendGrid contact list (After got added to contact, we sent them email about them succesfully subscribe/signed up) | In Progress | 

## TODO:
| Task | Progress | 
|--------|--------|
| Create Template in SendGrid for verify email | Done | 
| Try SendGrid Template | Done | 
| Add template id to send to user afer they got verified. | Done |
| Add endpoint Send Email to send email verification to user, and endpoint to verify user email | Done |
| Add endpoint to verify user email, and add user to SendGrid contact list | Done |
| Add template ids to send to user afer they got verified.| In Progress |
| Add endpoint for Send Email to inform user they are successfuly verified  | In Progress | 
| Add first_name and last_name to endpoint send email | In Progress | 
| Update css and html to adjust the new fields (first_name, and last_name) in litewallet.io form. | In Progress |
| Update javascript in litewallet.io to fetch the api. | In Progress |

## API Endpoint (Current, will be updated after all TODO done)
1. POST /sendEmail
   Example:
   ```{
     "email":"email@email.com",
     "country":"Indonesia"
   }```
2. GET /verify/:token&:email&:country
   No need to provide json data. Provide token, email receiver, and country.
   Example: /verify/:jhyiaakooa00922nnss&:email@email.com&:Indonesia

