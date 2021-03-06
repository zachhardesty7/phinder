# Phinder

Mobile app proof-of-concept that helps organizations and
students on campus connect with each other.

## Access Links

Want to [view a live (simulated) demo][demo] with databases with dummy info? Click "Tap to Play" on
the next page and
then scroll down and click "Open project in
Expo."

Want to [view the project on expo][expo-project]?

COMING SOON: Want to [read a brief case study][case-study] about the project on my website?

COMING SOON: Want to [run the actual app][expo-import] within the expo app? (Android only)

## Showcase

[View all full size demo images](https://imgur.com/a/HqIgwU2)

|                                                               |                                                               |                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| ![Main Page](https://i.imgur.com/jLr1yUC.png?raw=true)        | ![Org List Page](https://i.imgur.com/I4caDIH.png?raw=true)    | ![Org Details Page](https://i.imgur.com/2hcwcZw.png?raw=true) |
| ![Org Details Page](https://i.imgur.com/dZYMnc7.png?raw=true) | ![Org Details Page](https://i.imgur.com/HxJcyPa.png?raw=true) | ![Org Details Page](https://i.imgur.com/afQbzbx.png?raw=true) |

## Tools

Built with [React Native][react-native], [Expo][expo], &
[NativeBase][native-base].

Uses [Google Firebase][firebase] to store user and org info.

Uses [React Easy State][react-easy-state] for ultra simple state management.

Uses [React Native Calendars][react-native-calendars] for upcoming events.

Uses [Styled Components][styled-components] to create reusable and isolated style
components much easier than React Native stylesheets.

## Dependencies & Installation

1. Clone this repo.
2. Get Facebook App ID and Secret
3. Get Firebase Info
4. Create `secret.js` inside `./src/utils`
5. Add the following config variables
6. Run the following script commands to start the expo local server

``` javascript
export const secret = {
  FACEBOOK_APP_ID: '123456789012345',
  FACEBOOK_APP_SECRET: 'abcdef1234567890abcdef1234567890',
  FIREBASE_API_KEY: 'aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBc',
  FIREBASE_AUTH_DOMAIN: '{APP_NAME}.firebaseapp.com',
  FIREBASE_DATABASE_URL: 'https://{APP_NAME}.firebaseio.com',
  FIREBASE_PROJECT_ID: '{APP_NAME}',
  FIREBASE_STORAGE_BUCKET: '{APP_NAME}.appspot.com',
  FIREBASE_MESSENGER_SENDER_ID: '12345678901'
}
```

``` bash
yarn install
yarn dev
```

## Known Issues / Todo List

* sign in only supports Facebook
* loading pages are mediocre
* any page transitions can be tapped multiple times and all added to stack
* no way to display or interact with "Upcoming Events" (not linked to DB)
* ugly "Upcoming Events" title
* text areas should have left aligned text
* org screen
  * user cannot modify or delete
  * cannot click contact info links
  * probably doesn't need to be a card interface (gap at top)
  * cannot differentiate between loading & no members "View Members"
  * ugly screen when no member or applicants
  * leaving "View Applicants" forces refresh even without changes
* no way to edit profile picture

## Contributing

1. Fork it (<https://github.com/zachhardesty7/phinder/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

Copyright 2018 Zachary Hardesty

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[Full Apache 2.0 License Source](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

<!-- link definitions -->
[react-native]: https://facebook.github.io/react-native/
[expo]: https://expo.io/
[native-base]: https://nativebase.io/
[firebase]: https://firebase.google.com/
[react-easy-state]: https://github.com/solkimicreb/react-easy-state
[react-native-calendars]: https://github.com/wix/react-native-calendars
[styled-components]: https://www.styled-components.com/
[demo]: https://expo.io/appetize-simulator?url=https://expo.io/@zachhardesty7/phinder
[case-study]: https://zachhardesty.com#phinder
[expo-project]: https://expo.io/@zachhardesty7/phinder
[expo-import]: exp://exp.host/@zachhardesty7/phinder
