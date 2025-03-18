/*import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";*/
import { Tabs } from "expo-router";
import React from "react";
import { icons } from "../../constants";
import { View, Text, Image } from "react-native";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  /* const colorScheme = useColorScheme();*/

  return (
    <Tabs
      screenOptions={{
        /*tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,*/
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={color}
              name="Bookmark"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Create"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

/*
  import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors"; // Ensure this contains blue
import { useColorScheme } from "@/hooks/useColorScheme";

import { icons } from "../../constants";
import { View, Text, Image } from "react-native";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ tintColor: color, width: 24, height: 24 }} // Use style prop for color
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.home}
              color={focused ? "#0000FF" : "#A9A9A9"} // Blue when focused
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Bookmark",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.bookmark}
              color={focused ? "#0000FF" : "#A9A9A9"} // Blue when focused
              name="Bookmark"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.plus}
              color={focused ? "#0000FF" : "#A9A9A9"} // Blue when focused
              name="Create"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={icons.profile}
              color={focused ? "#0000FF" : "#A9A9A9"} // Blue when focused
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

*/
