import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
    colors: ['mediumblue', 'dodgerblue', 'deepskyblue'],
})`
    flex: 1;
`;
