import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/Screens/HomeScreen";
import IncomingCall from "./src/Screens/IncomingCall";
import OutgoingCall from "./src/Screens/OutgoingCall";
import CallScreen from "./src/Screens/CallScreen";
import { NavigationContainer } from "@react-navigation/native";

const HomeStack = createStackNavigator();

const HomeGroup = ()=>{
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <HomeStack.Screen name="IncomingCall" component={IncomingCall} options={{headerShown:false}}/>
            <HomeStack.Screen name="OutgoingCall" component={OutgoingCall} options={{headerShown:false}}/>
            <HomeStack.Screen name="CallScreen" component={CallScreen} options={{headerShown:false}}/>
        </HomeStack.Navigator>
    )
}
export const Navigation = ()=>{
    return(
        <NavigationContainer>
            <HomeGroup/>
        </NavigationContainer>
    )
}