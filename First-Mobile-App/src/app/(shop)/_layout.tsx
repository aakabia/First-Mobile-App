import { Tabs } from "expo-router"
import { SafeAreaView } from "react-native"

const TabsLayout = ()=>{
    return (
        <SafeAreaView>
        <Tabs>
           <Tabs.Screen name='index' options={{headerShown:false}}/>
           <Tabs.Screen name='orders' options={{}}/>
       </Tabs>
      </SafeAreaView>
    )
}

export default TabsLayout