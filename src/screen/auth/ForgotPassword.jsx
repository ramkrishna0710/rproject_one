import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import LoadingModal from '../../components/LoadingModal'
import CustomButton from '../../components/CustomButton'
import { AuthContext } from '../../context/AuthContext'
import { theme } from '../../constants/theme'
import { hp } from '../../helpers/common'

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { user, login, isLoading, loginSuccess } = useContext(AuthContext);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <LinearGradient colors={['#27974b', '#4ab24f', '#72d054']} style={styles.container}>
                <View style={styles.txtContainer}>
                    <Text style={styles.firstTxt}>HYDROGEN</Text>
                    <Text style={styles.lastTxt}>FOR LIFE</Text>
                </View>

                <Text style={styles.txt}> Enter your registered email address below to recieve a one-time password</Text>

                <TextInput
                    placeholder='Please enter your registered email'
                    value={email}
                    style={styles.emailInput}
                    keyboardType='email-address'
                    placeholderTextColor="#fff"
                    onChangeText={text => setEmail(text)}
                />

                {isLoading ? (
                    <LoadingModal loading={isLoading} />
                ) : (
                    <CustomButton
                        style={styles.submitContainer}
                        buttonName="Submit"
                        onPress={() => {navigation.navigate('ForgotOtp')}}
                        color={theme.colors.primary}
                    />
                )}
            </LinearGradient>
        </SafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtContainer: {
        alignItems: 'center'
    },
    firstTxt: {
        fontSize: 45,
        letterSpacing: 4.5,
        fontWeight: 'bold',
        color: 'white'
    },
    lastTxt: {
        fontSize: 28,
        letterSpacing: 8,
        color: 'white'
    },
    submitContainer: {
        height: '8%',
        width: '85%',
        borderRadius: 40,
        shadowColor: '#249646',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emailInput: {
        height: 50,
        width: '85%',
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'transparent',
        marginTop: 20,
        paddingHorizontal: 20,
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold'
    },
    txt: {
        fontSize: hp(2),
        color: theme.colors.white,
        fontWeight: theme.fonts.bold,
        textAlign: 'center',
        padding: theme.padding.xl,
        marginTop: theme.padding.xxl
    }
})