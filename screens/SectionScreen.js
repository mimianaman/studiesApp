import React from "react";
import styled from "styled-components";
import { TouchableOpacity, StatusBar, Linking, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-showdown";

class SectionScreen extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }
  componentWillMount() {
    StatusBar.setBarStyle("dark-content", true);
  }
  render() {
    const { route } = this.props;
    const { section } = route.params;
    return (
      <ScrollView>
        <Container>
          <StatusBar hidden />
          <Cover>
            <Image source={section.image} />
            <Wrapper>
              <Logo source={section.logo} />
              <Subtitle>{section.subtitle} </Subtitle>
            </Wrapper>
            <Title>{section.title} </Title>
            <Caption>{section.caption} </Caption>
          </Cover>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <CloseView>
              <Ionicons
                name="ios-close"
                size={36}
                color="#4775f2"
                style={{ marginTop: -2 }}
              />
            </CloseView>
          </TouchableOpacity>
          <Content>
            {/* <WebView
            scalesPageToFit={false}
            scrollEnabled={false}
            source={{
              html: section.content + htmlStyles,
            }}
            ref="webview"
            onNavigationStateChange={event => {
              console.log(event);
              if (event.url != "about.blank") {
                this.refs.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          /> */}
            <Markdown
              body={section.content}
              pureCSS={htmlStyles}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

export default SectionScreen;
const htmlContent = `
<h1>this is a title </h1>
<p>this <strong>is</strong>a<a href="http://designcode.io">link</a> </p>
<img src= "https://cdn.pixabay.com/photo/2020/06/14/22/46/the-caucasus-5299607_960_720.jpg",/>
           
`;
const htmlStyles = `
*{
  font-family: -apple-system, Roboto;
  margin:0
  padding:0
  font-size:17px
  font-weight:normal
  color:#3c4560
  line-height:24px
}
img{
  width:100%;
  border-radius;30px
  margin-top:28px
}

`;

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  height:1000px
  padding:20px
  
`;
const Cover = styled.View`
  height: 375px;
`;
const Image = styled.Image`
height:100%
width:100%
position:absolute
`;
const Title = styled.Text`
font-size:24px
color:white
font-weight:bold
width:170px
position:absolute
top:78px
left:20px
`;
const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom:20
  left:20
  width:300px
`;
const CloseView = styled.View`
width:32px
height:32px
background:white
border-radius:16px
box-shadow: 0 5px 10px rgba(0,0,0,0.15)
justify-content:center
align-items:center
`;
const Wrapper = styled.View`
flex-direction:row
position:absolute
top:40px
left:20px
align-items:center

`;
const Logo = styled.Image`
width:24px
height:24px
`;

const Subtitle = styled.Text`
font-weight:600
font-size:15px
color: rgba(255,255,255,0.8)
margin-left:5px
text-transform:uppercase
`;
