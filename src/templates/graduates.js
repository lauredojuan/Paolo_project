import React, {useState} from 'react';
import Layout from '../global/Layout';
import styled, {css, keyframes} from 'styled-components';
import {Row, Column, Wrapper, Divider} from '../components/Sections'
import {H2, H3, Title, Separator, Paragraph} from '../components/Heading'
import {Colors, Button} from '../components/Styling'
import {Card} from '../components/Card'
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import BaseRender from './_baseRender'
import Alumni from '../components/Alumni'

const Graduates = ({data, pageContext, yml}) => {
    console.log("jo", yml)
    return (
        <>
            <Wrapper
                style="default"
                image="yes"
                url={yml.banner.image}
                border="bottom"
                height="300px"
                backgroundSize="cover"
            >
                <Divider height="100px" />
                <Title
                    size="5"
                    title={yml.banner.tagline}
                    main
                    color={Colors.white}
                    fontSize="46px"
                    textAlign="center"
                />
            </Wrapper>
            <Divider height="100px" />
            <Wrapper
                style="default">
                <Alumni />
            </Wrapper>
            <Divider height="50px" />
            <Wrapper
                style="default"
                height="400px"

            >
                <Title
                    title={yml.about.heading}
                    primary
                    size="8"
                    paragraph={yml.about.sub_heading}
                />
                <Divider height="50px" />
                <Row>
                    <Column
                        size="12"
                        border="bottom"
                        image="no"
                    >
                        <Card shadow borders="1.25rem" height="426px" >
                            <Row
                                height="100%"
                                marginLeft="0"
                                marginRight="0"
                                customRespSize
                            >
                                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" image="no" border="bottom">
                                    <Row align="center" height="100%">
                                        <Column size="8" height="100%">
                                            <Row height="5%" />
                                            <Row height="90%" align="around">
                                                <Column size="12" alignSelf="center">
                                                    <Paragraph
                                                        color={Colors.gray}
                                                        fs_xs="12px"
                                                        fs_sm="12px"
                                                        fs_md="12px"
                                                        fs_lg="12px"
                                                        fs_xl="12px"
                                                        lineHeight="20px"
                                                        margin="20px 0 0 0"
                                                        align="left"
                                                    >
                                                        {yml.about.content}
                                                    </Paragraph>
                                                </Column>
                                            </Row>
                                            <Row height="5%" />


                                        </Column>
                                    </Row>
                                </Column>
                                <Column size="6" customRespSize respSize="6" alignSelf="center" height="100%" backgroundSize="cover" image="yes" url={yml.about.image} border="custom" customBorderRadius="0 1.25rem 1.25rem 0" />
                            </Row>
                        </Card>
                    </Column>
                </Row>
            </Wrapper>

            <Divider height="250px" />

        </>
    )
};
export const query = graphql`
  query AlumniQuery($file_name: String!, $lang: String!) {
    allPageYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
          
          meta_info{
            slug
            title
            description
            image
            keywords
          }
          banner{
            tagline
            sub_heading
            image 
          }
          about{
            heading
            sub_heading
            image
            content
          }
        }
      }
    }
  }
`;
export default BaseRender(Graduates);