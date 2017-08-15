/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { 
	 AppRegistry
	,StyleSheet
	,Text
	,TextInput
	,View
	,Image
	,Platform
	,TouchableHighlight
	,TouchableNativeFeedback
	,Navigator
	,StatusBar
	,AsyncStorage 
} from 'react-native';

import Form from 'react-native-form';
import Button from 'react-native-button';
import TimerMixin from 'react-timer-mixin';

var _setStorage = function(key, value) {

	try {
		AsyncStorage.setItem('@SitegigApp:' + key, value);
	} catch (error) {
		console.log('error when setting data');
	}

}

var _clearStorage = function() {
	AsyncStorage.clear();
}

var _sgApiCall = function(endpoint, data, callback) {

	try {

		AsyncStorage.getItem('@SitegigApp:token').then((token) => {

			fetch(endpoint, {
				 method: 'POST'
				,headers: {
					 'Accept': 'application/json'
					,'Content-Type': 'application/json'
					,'x-access-token': token
				}
				,body: JSON.stringify(data)
			})
			.then((response) => response.json())
			.then((responseJson) => {
				callback(responseJson);
			})
			.catch((error) => {
				console.error(error);
			});

		});

	} catch (error) {
		console.log('error when getting data');
	}

}


class AwesomeProject extends Component {
	
	_renderScene(route, navigator) {
		switch(route.id) {
			case 1:
				return <Login navigator={navigator} />
			case 2:
				return <Welcome navigator={navigator} />
			case 3:
				return <Main navigator={navigator} />
			case 4:
				return <MainArticles navigator={navigator} />
			case 5:
				return <MainArticlesAdd navigator={navigator} />
			case 70:
				return <MainUploads navigator={navigator} />
			case 72:
				return <MainUploadsCapture navigator={navigator} />
		}
	}

	render() {
		return (
			<Navigator initialRoute={{id: 1, }} renderScene={this._renderScene} />
		);
	}

}

var MainUploadsCapture = React.createClass({

	_goBack(page) {
		this.props.navigator.push({ id: 70, });
	},

	render: function() {
		return (
			<View style={[styles.container, { backgroundColor: '#00825F' }]}>
				<StatusBar backgroundColor="#006045" barStyle="light-content" />
				<Button style={ styles.button } styleDisabled={{ color: 'red' }} onPress={ () => this._goBack() }>
					Back
				</Button>
				<Text style={ styles.text } onPress={ () => this._goToPage(72) }>
					Back
				</Text>
			</View>
		);
	
	}

});

var MainUploads = React.createClass({

	_goBack(page) {
		this.props.navigator.push({ id: 3, });
	},

	_goToPage(page) {
		this.props.navigator.push({ id: page, });
	},

	render: function() {
		return (
			<View style={[styles.container, { backgroundColor: '#00825F' }]}>
				<StatusBar backgroundColor="#006045" barStyle="light-content" />
				<Button style={ styles.button } styleDisabled={{ color: 'red' }} onPress={ () => this._goBack() }>
					Back
				</Button>
				<Button style={ styles.button } styleDisabled={{ color: 'red' }} onPress={ () => this._goToPage(72) }>
					Take a picture
				</Button>
			</View>
		);
	
	}

});


var Main = React.createClass({
  
	componentDidMount: function() {

		try {

			AsyncStorage.getItem('@SitegigApp:token').then((value) => {
				
				this.setState({ 'token' : value });
			
			}).done();

		} catch (error) {
			console.log('error when getting data');
		}

	},

    getInitialState: function() {
        return { };
    },

  	_unauthorize() {
		
  		_clearStorage();

		this.props.navigator.push({id: 1,});
	},

	_goToPage(page) {
		this.props.navigator.push({id: page,});
	},

	render() {
		return (
			<View style={[ styles.container, { backgroundColor: '#00825F' } ]}>
				<StatusBar backgroundColor="#006045" barStyle="default" />
				<Image style={styles.stretchsmaller} source={require('./img/sitegig_inv.png')} />
				<View style={[ styles.mainmenu ]}>
					<Button styleDisabled={{color: 'red'}} onPress={ () => this._goToPage(4) }>
						<View style={[ styles.menubutton, styles.menubutton1 ]}>
							<Image style={styles.icon} source={require('./img/icons/newspaper.png')} />
							<Text style={styles.icontext}>Articles</Text>
						</View>
					</Button>
					<Button styleDisabled={{color: 'red'}} onPress={ () => this._unauthorize() }>
						<View style={[ styles.menubutton, styles.menubutton2 ]}>
							<Image style={styles.icon} source={require('./img/icons/twitter.png')} />
							<Text style={styles.icontext}>Comments</Text>
						</View>
					</Button>
				</View>
				<View style={[ styles.mainmenu ]}>
					<Button styleDisabled={{color: 'red'}} onPress={ () => this._unauthorize() }>
						<View style={[ styles.menubutton, styles.menubutton3 ]}>
							<Image style={styles.icon} source={require('./img/icons/pantone.png')} />
							<Text style={styles.icontext}>Categories</Text>
						</View>
					</Button>
					<Button styleDisabled={{color: 'red'}} onPress={ () => this._unauthorize() }>
						<View style={[ styles.menubutton, styles.menubutton4 ]}>
							<Image style={styles.icon} source={require('./img/icons/browser.png')} />
							<Text style={styles.icontext}>Pages</Text>
						</View>
					</Button>
				</View>
				<View style={[ styles.mainmenu ]}>
					<Button styleDisabled={{color: 'red'}} onPress={ () => this._unauthorize() }>
						<View style={[ styles.menubutton, styles.menubutton5 ]}>
							<Image style={styles.icon} source={require('./img/icons/shoe.png')} />
							<Text style={styles.icontext}>Products</Text>
						</View>
					</Button>
					<Button styleDisabled={{color: 'red'}} onPress={ () => this._unauthorize() }>
						<View style={[ styles.menubutton, styles.menubutton6 ]}>
							<Image style={styles.icon} source={require('./img/icons/shopping-bag.png')} />
							<Text style={styles.icontext}>Orders</Text>
						</View>
					</Button>
				</View>
				<View style={[ styles.mainmenu ]}>
					<Button styleDisabled={{color: 'red'}} onPress={ () => this._goToPage(70) }>
						<View style={[ styles.menubutton, styles.menubutton7 ]}>
							<Image style={styles.icon} source={require('./img/icons/pictures.png')} />
							<Text style={styles.icontext}>Uploads</Text>
						</View>
					</Button>
					<Button styleDisabled={{color: 'red'}} onPress={ () => this._unauthorize() }>
						<View style={[ styles.menubutton, styles.menubutton8 ]}>
							<Image style={styles.icon} source={require('./img/icons/exit.png')} />
							<Text style={styles.icontext}>Exit</Text>
						</View>
					</Button>
				</View>
			</View>
		);
	}

});

var MainArticlesAdd = React.createClass({

	getInitialState() {
		return {
			 title: ''
			,article: ''
		};
	},

  	_goBack() {
		this.props.navigator.push({id: 4, });
	},

	_sendArticle() {

		var data = {
			 a_title: this.state.title
			,category_id: 0
			,a_description: ''
			,a_content: this.state.article
			,user_id: 0
		};
		
		_sgApiCall('http://192.168.1.6:3011/rest/add/article', data, (json) => {

			if (json.auth == 200 && json.aid > 0) {

				alert('Article added!');
			
				this.props.navigator.push({id: 4, });

			} else {
				alert('cannot add article');
			}
		
		});
	},

	render: function() {
		return (
			<View style={[styles.container, { backgroundColor: '#00825F' }]}>
				<StatusBar backgroundColor="#006045" barStyle="light-content" />
				<Button style={ styles.button } styleDisabled={{ color: 'red' }} onPress={ () => this._goBack() }>
					Back
				</Button>
				<Text style={ styles.text } onPress={ () => this._handlePress() }>
					Add article
				</Text>
				<TextInput style={ styles.inputstyle } type="TextInput" name="Title" placeholder="Title" onChangeText={ (title) => this.setState({title}) } />
				<TextInput style={ styles.textareastyle } multiline={ true } type="TextInput" name="article" placeholder="Article" onChangeText={ (article) => this.setState({article}) } />
				<Button style={ styles.button } styleDisabled={{color: 'red'}} onPress={ () => this._sendArticle() }>
					Add
				</Button>
			</View>
		);
	}

});

var MainArticles = React.createClass({

  	_goBack() {
		this.props.navigator.push({id: 3, });
	},

  	_addArticle() {
		this.props.navigator.push({id: 5, });
	},

	render: function() {
		return (
			<View style={[styles.container, {backgroundColor: '#00825F'}]}>
				<StatusBar backgroundColor="#006045" barStyle="light-content" />
				<Button style={styles.button} styleDisabled={{color: 'red'}} onPress={ () => this._goBack() }>
					Back
				</Button>
				<Button style={styles.button} styleDisabled={{color: 'red'}} onPress={ () => this._addArticle() }>
					+ Article
				</Button>
				<Text style={styles.instructions} onPress={ () => this._handlePress() }>
					Authentication successful
				</Text>
			</View>
		);
	}

});

var Welcome = React.createClass({

	mixins: [TimerMixin],

	componentDidMount: function() {

		this.setTimeout(() => { 
			
			this.props.navigator.push({id: 3,});

		}, 2500);

	},

	_handlePress: function() {
		this.props.navigator.push({id: 3,});
	},

	render: function() {
		return (
			<View style={[styles.container, {backgroundColor: '#00E0A2'}]}>
				<StatusBar backgroundColor="#006045" barStyle="light-content" />
				<Text style={styles.instructions} onPress={ () => this._handlePress() }>
					Authentication successful
				</Text>
			</View>
		);
	}

});

var Login = React.createClass({

	getInitialState() {
		return {
			 email : "w00t@w00t.com"
			,password  : "w00t"
		};
	},

	componentWillMount() {

		try {

			AsyncStorage.getItem('@SitegigApp:token').then((token) => {

				var domain = "http://192.168.1.6:3011";

				var endpoint = domain + "/rest/test/auth";

				var data = {};

				fetch(endpoint, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
					headers: {
						'x-access-token' : token
					}
				})
				.then((response) => response.json())
				.then((responseJson) => {
					
					if (responseJson.auth == 200) {

						_setStorage('token', responseJson.token);

						this.props.navigator.push({id: 3,});

					} else {
						alert('You must authorize yourself first!');
					}

				})
				.catch((error) => {
					console.error(error);
				});
			
			}).done();

		} catch (error) {
			console.log('error when getting data');
		}

	},

	_handleAuthorize() {

		var domain = "http://192.168.1.6:3011";
		var endpoint = domain + "/rest/auth/bypattern";
		var pattern = 'android';
		var email = this.state.email;
		var password = this.state.password;

		var data = {
			 gig_pattern: pattern
			,gig_email: email
			,gig_pass: password
		};

		fetch(endpoint, {
			 method: 'POST'
			,headers: {
				 'Accept': 'application/json'
				,'Content-Type': 'application/json'
			}
			,body: JSON.stringify(data)
		})
		.then((response) => response.json())
		.then((responseJson) => {
			
			if (responseJson.auth == 200) {

				_setStorage('token', responseJson.token);

				alert(responseJson.token);

				this.props.navigator.push({id: 2,});

			} else {
				alert('Authorization failed. Check your username, password and that Android API key exists.');
			}

		})
		.catch((error) => {
			console.error(error);
		});

	},

	render() {
		
		return (
			<View style={styles.container}>
				<StatusBar backgroundColor="#555" barStyle="light-content" />
				<Image style={styles.stretch} source={require('./img/sitegig_inv.png')} />
				<Text style={styles.instructions}>
					Login to your SiteGiG site
				</Text>
				<Form ref="form">
					<TextInput style={styles.inputstyle} type="TextInput" name="domain" placeholder="Domain (http://example.com)" onChangeText={(domain) => this.setState({domain})} />
					<TextInput style={styles.inputstyle} type="TextInput" name="email" placeholder="E-mail" onChangeText={(email) => this.setState({email})} />
					<TextInput style={styles.inputstyle} type="TextInput" secureTextEntry={true} name="password" placeholder="Password" onChangeText={(password) => this.setState({password})} />
					<Button style={styles.button} styleDisabled={{color: 'red'}} onPress={ () => this._handleAuthorize() }>
						Authorize
					</Button>
				</Form>
			</View>
		);

	}

});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#00BA87'
	},
	welcome: {
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#007958',
		marginBottom: 5,
		fontSize: 18
	},
	text: {
		textAlign: 'center',
		color: '#eee',
		marginBottom: 5,
		fontSize: 18,
		marginTop: 10,
		marginBottom: 10
	},
	stretchsmaller: {
		flexDirection: 'column',
		height: 90,
		resizeMode: 'contain',
		backgroundColor: '#00825F',
		marginBottom: 10
	},
	stretch: {
		width: 350,
		height: 150,
		resizeMode: 'contain'
	},
	button: {
		fontSize: 18,
		color: '#ffffff',
		marginTop: 10,
		backgroundColor: '#009B71',
		padding: 8
	},
	mainmenu: {
		flexDirection: 'row' 
	},
	icon: {
		resizeMode: 'contain',
		flexDirection: 'column',
		width: 180,
		height: 50
	},
	icontext: {
		padding: 10,
		textAlign: 'center',
		fontWeight: 'normal',
		color: '#fff',
		justifyContent: 'center',
	},
	menubutton: {
		height: 120,
		width: 180,
		paddingTop: 22,
	},
	menubutton1: {
		backgroundColor: '#00AF7F',
	},
	menubutton2: {
		backgroundColor: '#009E72',
	},
	menubutton3: {
		backgroundColor: '#00946B',
	},
	menubutton4: {
		backgroundColor: '#008862',
	},
	menubutton5: {
		backgroundColor: '#007C5A',
	},
	menubutton6: {
		backgroundColor: '#00694C',
	},
	menubutton7: {
		backgroundColor: '#005B42',
	},
	menubutton8: {
		backgroundColor: '#00513B',
	},
	textareastyle: {
		textAlignVertical: 'top',
		backgroundColor: '#DFFFF6',
		width: 300,
		height: 250,
		marginTop: 10,
		padding: 10,
		fontSize: 16
	},
	inputstyle: {
		backgroundColor: '#DFFFF6',
		alignItems: 'center',
		width: 300,
		textAlign: 'center',
		marginTop: 10,
		padding: 4,
		fontSize: 16
	}
});

AppRegistry.registerComponent( 'AwesomeProject', () => AwesomeProject);