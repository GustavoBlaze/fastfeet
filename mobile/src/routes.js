import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';
import Detail from '~/pages/Detail';
import NewProblem from '~/pages/NewProblem';
import Problems from '~/pages/Problems';
import Confirm from '~/pages/Confirm';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Deliveries: {
              screen: createStackNavigator(
                {
                  Deliveries,
                  Detail,
                  NewProblem,
                  Problems,
                  Confirm,
                },
                {
                  defaultNavigationOptions: ({ navigation }) => ({
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 15,
                      paddingTop: 20,
                    },
                    headerTitleStyle: {
                      paddingTop: 20,
                    },
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.goBack();
                        }}
                      >
                        <Icon name="chevron-left" size={20} color="#fff" />
                      </TouchableOpacity>
                    ),
                  }),
                }
              ),
              navigationOptions: () => ({
                tabBarLabel: 'Entregas',
                activeTintColor: '#7D40E7',
                inactiveTintColor: '#999999',

                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="reorder" size={25} color={tintColor} />
                ),
              }),
            },
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7D40E7',
              inactiveTintColor: '#999999',
              labelStyle: {
                fontSize: 14,
              },
              style: {
                backgroundColor: '#fff',
                height: 70,
                paddingTop: 10,
                paddingBottom: 10,
                shadowColor: '#000',
                borderTopWidth: 1,
                borderTopColor: 'rgba(0,0,0,0.07)',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
