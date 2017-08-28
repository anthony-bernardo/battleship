/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image, TouchableHighlight,
  View
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Game from './src/objects/Game.js';
import Player from './src/objects/Player.js';
import PlaceShips from './src/IA/PlaceShips.js';

export default class BattleShip extends Component {

  constructor(){
    super();
    this.player1 = new Player(1001, 'Anthony');
    this.player2 = new Player(1002, 'Ivan');
    this.game = new Game(this.player1, this.player2, 10);
    this.placeShipsHelper = new PlaceShips(this.game, this.player1);
    this.placeShipsHelper.execute();
    console.log(this.game.playerSea(this.player1).seaMatrix);
  }

  render() {
    var cells = this.game.playerSea(this.player1).seaMatrix.map(function(row, index2){
      var rows = row.map(function(cell, index){
        if(cell == 1){
          return <TouchableHighlight onPress={this._onPressButton} key={index}> 
                  <Image source={require('./src/assets/boat.png')} style={{width: 35, height: 35}} /> 
                </TouchableHighlight>;
        }
        if(cell == 0){
          return <TouchableHighlight onPress={this._onPressButton} key={index}> 
                  <Image source={require('./src/assets/empty.png')} style={{width: 35, height: 35}} /> 
                </TouchableHighlight>;
        }
      })
      return <Row key={index2}>
              {rows}
            </Row>;
    })
    return (
      <Grid style={{ backgroundColor: '#ADD8E6', height: 200 }}>
        { cells }
      </Grid>
    );
  }
}

AppRegistry.registerComponent('BattleShip', () => BattleShip);
