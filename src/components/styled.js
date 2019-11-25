import { View } from 'react-native'

import {
	Button,
	Form,
	H1,
	Icon,
	Picker,
	Right,
	Separator,
	Spinner,
	Text,
	Thumbnail,
} from 'native-base'
import styled from 'styled-components/native'

// fontFamily: 'space-mono'

const SThumbnail = {}

SThumbnail.Profile = styled(Thumbnail)`
  display: flex;
  align-items: center;
  align-self: center;
  margin: 20px 0;
  padding: 5px;
`

SThumbnail.Org = styled(Thumbnail)`
  display: flex;
  align-self: center;
  margin: 20px 0;
`

// only add space on left for text
const SIconRight = styled(Icon)`
  margin: 0 0 0 5px;
`

const SButton = styled(Button)`
  display: flex;
  flex: 1;
  justify-content: center;
  margin-left: ${({ marginLeft = '15px' }) => marginLeft};
  margin-right: ${({ marginRight = '0' }) => marginRight};
`

const SButtonRound = styled(Button)`
  display: flex;
  flex: 1;
  padding-left: 15px;
  padding-right: 15px;
`

const SSeparator = styled(Separator)`
  margin: 20px 0px;
  margin-right: -15px;
`

const SView = {}

SView.Buttons = styled(View)`
  display: flex;
  flex: 1;
  flex-direction: row;
  margin: 20px 0;
  padding-right: 15px;
  align-content: center;
  align-items: center;
`

SView.Center = styled(View)`
  display: flex;
  flex: 1;
  align-self: center;
`

const SText = styled(Text)`
  text-align: center;
  padding: ${({ padding }) => padding || 0};
`

const SH1 = styled(H1)`
  text-align: center;
  padding: 30px 0;
`

const SSpinner = styled(Spinner)`
  display: flex;
  align-self: center;
  margin-top: 20px;
`

const SRight = styled(Right)`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`

const SForm = styled(Form)`
  padding-right: 15px;
`

/**
 * collection of base styles applied to reusable components across app
 *
 * components can be imported in two ways
 * preferred way namespaces components (to easily tell they're from `styled-components`)
 * and provides eslint (import) feedback when trying to reference undefined component
 * or, secondarily, components can be imported as standard named imports
 *
 * @example
 *
 * import * as S from '../components/styled'
 * import { Thumbnail, Text } from '../components/styled'
 *
 * const Component = () => (
 *  <div>
 *    <S.Thumbnail />
 *    <S.SForm />
 *    <Text>Lorem Ipsum</Text>
 *  </div>
 * )
 */
export {
	SIconRight as IconRight,
	SForm as Form,
	SSeparator as Separator,
	SThumbnail as Thumbnail,
	SRight as Right,
	SH1 as H1,
	SView as View,
	SText as Text,
	SButton as Button,
	SButtonRound as ButtonRound,
	SSpinner as Spinner,
}
