import { View, Text } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const LocationDirection = () => {
    return (
        <View style={{flex:1}}>
            <WebView
                source={{
                    uri: 'https://www.google.co.in/maps/place/The+Oval/@51.4838366,-0.1186582,17z/data=!4m12!1m5!3m4!2zNTHCsDI5JzAxLjgiTiAwwrAwNic1Ny45Ilc!8m2!3d51.4838333!4d-0.1160833!3m5!1s0x4876049284a69f57:0xd5112b823b377298!8m2!3d51.4837565!4d-0.1149737!16zL20vMDIyZHdy?entry=ttu',
                }}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    )
}

export default LocationDirection