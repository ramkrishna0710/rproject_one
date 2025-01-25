import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screen/HomeScreen';
import FirstScreen from '../screen/auth/FirstScreen';
import SignUp from '../screen/auth/SignUp';
import LogIn from '../screen/auth/LogIn';
import OtpScreen from '../screen/auth/OtpScreen';
import MyProfile from '../screen/auth/MyProfile';
import { AuthContext } from '../context/AuthContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../screen/CustomDrawerContent';
import EventDetails from '../screen/EventDetailsScreen';
import AgendaScreen from '../screen/Agenda';
import Speakers from '../screen/Speakers';
import Maps from '../screen/Maps';
import Videos from '../screen/Videos';
import Sponsors from '../screen/Sponsors';
import AgendaDetailsScreen from '../screen/AgendaDetails';
import SessionScreen from '../screen/SessionScreen';
import SpeakersScreen from '../screen/SpeakersScreen';
import SpeakerDetails from '../screen/SpeakerDetails';
import SpeakersDetailsMain from '../screen/SpeakersDetailsMain';
import QandA from '../screen/QandA';
import SessionScreenModal from '../screen/SessionScreenModal';
import Notification from '../screen/Notification';
import DetailsEventsTab from '../screen/DetailsEventsTab';
import LoadingModal from '../components/LoadingModal';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="AgendaScreen" component={AgendaScreen} />
            <Drawer.Screen name="Speakers" component={Speakers} />
            <Drawer.Screen name="Maps" component={Maps} />
            <Drawer.Screen name="Videos" component={Videos} />
            <Drawer.Screen name="Sponsors" component={Sponsors} />
            <Drawer.Screen name="QandA" component={QandA} />
            <Drawer.Screen name="AgendaDetails" component={AgendaDetailsScreen} />
            <Drawer.Screen name="SessionScreen" component={SessionScreen} />
            <Drawer.Screen name="SpeakersScreen" component={SpeakersScreen} />
            <Drawer.Screen name="SessionScreenModal" component={SessionScreenModal} />
            <Drawer.Screen name="SpeakerDetails" component={SpeakerDetails} />
            <Drawer.Screen name="SpeakersDetailsMain" component={SpeakersDetailsMain} />
            <Drawer.Screen name="Notification" component={Notification} />
            <Drawer.Screen name="DetailsEventsTab" component={DetailsEventsTab} />
        </Drawer.Navigator>
    );
};


const AuthNav = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="First"
                component={FirstScreen}
            />
            <Stack.Screen
                name='SignUp'
                component={SignUp}
            />
            <Stack.Screen
                name='LogIn'
                component={LogIn}
            />
            <Stack.Screen
                name='OtpScreen'
                component={OtpScreen}
            />
            <Stack.Screen name="DrawerNav" component={DrawerNav} />
            <Stack.Screen
                name='MyProfile'
                component={MyProfile}
            />
        </Stack.Navigator>
    );
};

const Navigation = () => {

    const { isLoading, user, otpSuccess } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {isLoading ? (
                <LoadingModal />
            ) : (
                user !== null ? (
                    <DrawerNav />
                ) : (
                    <AuthNav />
                )
            )}
        </NavigationContainer>
    )
}

export default Navigation