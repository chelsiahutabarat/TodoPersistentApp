import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My Todo App</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}