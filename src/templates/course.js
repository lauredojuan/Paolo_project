import React, {useState, useEffect, useContext, useRef} from 'react';
import {useInView} from "react-intersection-observer";
import Link from 'gatsby-link'
import Layout from '../global/Layout';
import styled from 'styled-components';
import {Card} from '../components/Card'
import {Container, Row, Column, Wrapper, Divider, Sidebar} from '../components/Sections'
import {Title, H2, H3, H4, Span, Paragraph} from '../components/Heading'
import {Button, Colors, Check, ArrowRight, Circle, RoundImage, Utensils, Coffee, Dumbbell, LaptopCode, FileCode} from '../components/Styling'
import GeeksVsOthers from '../components/GeeksVsOthers'
import PricesAndPayment from '../components/PricesAndPayment'
import Alumni from '../components/Alumni'
import Credentials from '../components/Credentials'
import Scrollspy from 'react-scrollspy'
import BaseRender from './_baseRender'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ProgramSelector from '../components/ProgramSelector'
import ToggleButton from '../components/ToggleButton'
import {requestSyllabus} from "../actions";
// import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

// import Modal from '../components/Modal';
// import SimpleModal from '../components/SimpleModal';

const Input = styled.input`
    background-color:${Colors.lightGray};
    height: 40px;
    width: 100%;
    border: none;
    font-family: 'Lato', sans-serif;
    font-size: 14px;
    font-color: ${Colors.black};
`
function rand () {
  return Math.round(Math.random() * 20) - 10;
}


function getModalStyle () {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '1.25rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Program = ({data, pageContext, yml}) => {
  const [ref, inView] = useInView({
    threshold: 0
  });
  const scrollRef = useRef();
  const [test, setTest] = useState("")
  const [oldScrollPos, setOldScrollPos] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0);
  const geek = data.allCourseYaml.edges[0].node;
  const [showModal, setShowModal] = useState(false);
  const [formMessage, setFormMessage] = useState("Fill the form to submit");
  const details = data.allCourseYaml.edges[0].node.details[0];
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const steps = getSteps(yml);
  const [formData, setVal] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleStep = step => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };


  // console.log("tempQ", data.allTypicalDayYaml)
  function getStepTitle (step) {
    switch (step) {
      case 0:
        return `${yml.typical.schedule[0].title}`
      case 1:
        return `${yml.typical.schedule[1].title}`
      case 2:
        return `${yml.typical.schedule[2].title}`
      case 3:
        return `${yml.typical.schedule[3].title}`
      case 4:
        return `${yml.typical.schedule[4].title}`
      case 5:
        return `${yml.typical.schedule[5].title}`
      default:
        return 'Unknown step';
    }
  }
  function getStepContent (step) {
    switch (step) {
      case 0:
        return `${yml.typical.schedule[0].content}`
      case 1:
        return `${yml.typical.schedule[1].content}`
      case 2:
        return `${yml.typical.schedule[2].content}`
      case 3:
        return `${yml.typical.schedule[3].content}`
      case 4:
        return `${yml.typical.schedule[4].content}`
      case 5:
        return `${yml.typical.schedule[5].content}`
      default:
        return 'Unknown step';
    }
  }


  let week = "";
  {
    pageContext.slug === "full-stack-web-development-bootcamp-full-time" || pageContext.slug === "desarrollo-web-full-stack-bootcamp-full-time"
      ? week = 9
      : pageContext.slug === "full-stack-web-development-bootcamp-part-time" || pageContext.slug === "desarrollo-web-full-stack-bootcamp-part-time"
        ? week = 16
        : pageContext.slug === "coding-introduction" || pageContext.slug === "introduccion-programacion"
        && null
  }
  console.log('pageContext', pageContext)
  console.log('yml', yml)
  console.log('data', data)
  return (<>
    <div className={test}
    >
      <Wrapper
        style="default"
        image="yes"
        url={yml.meta_info.image}
        border="bottom"
        height="600px"
        backgroundSize="cover"
      >
        <Divider height="20%" />
        <ProgramSelector week={week} />
        <Divider height="20px" />
        <Title
          size="5"
          title={yml.tagline}
          main
          color={Colors.white}
          fontSize="46px"
          textAlign="center"

        />
        <Row align="center">
          <Column align="right" size="6"><Link to={yml.button.apply_button_link}><Button width="200px" color="red" margin="15px 0" textColor=" white">{yml.button.apply_button_text}</Button></Link></Column>
          <Column align="left" size="6">
            <Button width="200px" onClick={handleOpen} color={Colors.blue} margin="15px 0" textColor=" white">{yml.button.syllabus_button_text}</Button>
          </Column>
        </Row>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        ><div style={modalStyle} className={classes.paper}>
            <Row height="20%" align="center">
              <Column size="12" align="center"><H4>REQUEST SYLLABUS</H4></Column>
            </Row>
            <Row height="70%">
              <Column size="12">
                <Row height="30%" align="center">
                  <Column size="11" >
                    <Input
                      type="text" className="form-control" placeholder="First name *"
                      onChange={(e) => setVal({...formData, first_name: e.target.value})}
                      value={formData.firstName}
                    />
                  </Column>
                </Row>
                <Row height="30%" align="center">
                  <Column size="11">
                    <Input type="text" className="form-control" placeholder="Last Name *"
                      onChange={(e) => setVal({...formData, last_name: e.target.value})}
                      value={formData.lastName}
                    />
                  </Column>
                </Row>
                <Row height="30%" align="center">
                  <Column size="11">
                    <Input type="email" className="form-control" placeholder="Email *"
                      onChange={(e) => setVal({...formData, email: e.target.value})}
                      value={formData.email}
                    />
                  </Column>
                </Row>
              </Column>
            </Row>
            <Row height="10%" padding="5px 0 0 0" borderTop={`1px solid ${Colors.blue}`}>

              <Column size="6" customRespSize respSize="6">
                <Paragraph>{formMessage}</Paragraph>
              </Column>
              <Column size="3" customRespSize respSize="3" align="right">
                {
                  formData.first_name &&
                    formData.last_name &&
                    formData.email ?
                    <Button width="100%" padding=".2rem .45rem" color={Colors.blue} textColor={Colors.white}
                      onClick={() => {
                        requestSyllabus(formData)
                        setFormMessage("")
                      }}>Submit</Button>
                    : null
                }
              </Column>
              <Column size="3" customRespSize respSize="3" align="right">
                <Button outline width="100%" padding=".2rem .45rem" color={Colors.red} textColor={Colors.white} onClick={handleClose}>Close</Button>
              </Column>
            </Row></div>
        </Modal>
      </Wrapper>
      <Wrapper
        style="default">

        <Credentials up="60" lang={data.allCredentialsYaml.edges} />
      </Wrapper>
      <Sidebar
        shadow
        borders="1.25rem"
        display_xs="none"
        display_sm="none"
        display_md="none"
      >
        <Scrollspy style={{fontSize: "12px", position: "sticky", top: "10%", fontFamily: "Lato-Bold, sans-serif", color: Colors.blue}} items={['section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6',]} currentClassName="nav__item--active">
          <li><a className="nav-item nav-link side" href="#section-1" >{yml.sidebar.membership}</a></li>
          <li><a className="nav-item nav-link side" href="#section-2">{yml.sidebar.program}</a></li>
          <li><a className="nav-item nav-link side" href="#section-3">{yml.sidebar.geeks_vs_other}</a></li>
          <li><a className="nav-item nav-link side" href="#section-4">{yml.sidebar.pricing}</a></li>
          <li><a className="nav-item nav-link side" href="#section-5">{yml.sidebar.alumni}</a></li>
        </Scrollspy>
      </Sidebar>
      <section className="section" id="section-1"></section>
      <Container fluid>
        <Row>
          <Column size="2">
          </Column>
          <Column size="8">
            <Row >
              <Column size="6" >
                <Card
                  h_xs="400px"
                  h_sm="370px"
                  h_md="470px"
                  h_lg="470px"
                  h_xl="470px"
                  padding="20px"
                  shadow height="400px"
                  width="100%"
                  margin="10px 0px"
                  move="up"
                  up="100px">
                  <Row height="100%">
                    <Column size="10" customRespSize respSize="10">
                      <Row marginLeft="0px" marginBottom="15px" height="15%">
                        <RoundImage url="/images/geekpal.png" bsize="contain" height="100%" position="left" />
                      </Row>
                      <Row marginTop="15px">
                        <Column size="12">
                          <Paragraph
                            fs_xs="10px"
                            fs_sm="10px"
                            fs_md="11px"
                            fs_lg="12px"
                            fs_xl="16px"
                            color={Colors.black}
                            customTextAlignSmall
                            alignXs="left">{geek.geek_data.geek_pal_heading}</Paragraph>
                        </Column>
                      </Row>
                      <Row marginTop="15px">
                        <Column size="12">
                          {geek.geek_data.geek_pal.map((pal, index) => {
                            return (
                              <Row key={1} marginBottom="4px">
                                <Column size="1" customRespSize respSize="1" alignSelf="center">
                                  <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                                </Column>
                                <Column size="8" customRespSize respSize="8" test paddingRight="0px" paddingLeft="5px" alignSelf="center">
                                  <Paragraph
                                    fs_xs="10px"
                                    fs_sm="10px"
                                    fs_md="12px"
                                    fs_lg="12px"
                                    fs_xl="14px"
                                    color={Colors.gray}>{pal}</Paragraph>
                                </Column>
                              </Row>
                            )
                          })}
                        </Column>
                      </Row>
                    </Column>
                    <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} /></Column>
                  </Row>
                </Card>
              </Column>
              <Column size="6">
                <Card
                  h_xs="400px"
                  h_sm="400px"
                  h_md="470px"
                  h_lg="470px"
                  h_xl="470px"
                  padding="20px"
                  shadow
                  height="400px"
                  width="100%"
                  margin="10px 0px"
                  move="up"
                  up="100px">
                  <Row height="100%">
                    <Column size="10" customRespSize respSize="10">
                      <Row marginLeft="0px" marginBottom="15px" height="15%">
                        <RoundImage url="/images/geekforce.png" bsize="contain" height="100%" position="left" />
                      </Row>
                      <Row >
                        <Column size="12">
                          <Paragraph fontSize="16px" color={Colors.black} customTextAlignSmall
                            alignXs="left">{geek.geek_data.geek_force_heading}</Paragraph>
                        </Column>
                      </Row>
                      <Row marginTop="15px">
                        <Column size="12">
                          {geek.geek_data.geek_force.map((pal, index) => {
                            return (
                              <Row key={1} marginBottom="2px" >
                                <Column size="1" customRespSize respSize="1" alignSelf="center">
                                  <Check width="12px" color={Colors.yellow} fill={Colors.yellow} />
                                </Column>
                                <Column size="8" customRespSize respSize="8" paddingRight="0px" paddingLeft="5px" alignSelf="center">
                                  <Paragraph fs_xs="10px"
                                    fs_sm="10px"
                                    fs_md="11px"
                                    fs_lg="12px"
                                    fs_xl="14px" color={Colors.gray}>{pal}</Paragraph>
                                </Column>
                              </Row>
                            )
                          })}
                        </Column>
                      </Row>
                    </Column>
                    <Column size="2" customRespSize respSize="2" alignSelf="flex-end"><ArrowRight width="24px" color={Colors.yellow} fill={Colors.yellow} /></Column>
                  </Row>
                </Card>
              </Column>
            </Row>
          </Column>
        </Row>
      </Container>
      {/* </Wrapper> */}
      <Divider height="100px" />

      {/* PROGRAM DETAILS */}
      <Wrapper
        style="default"

      >
        <Title
          size="10"
          title={yml.details.heading}
          paragraph={yml.details.sub_heading}
          primary
        />
        <Divider height="50px" />
        <Row>
          <Column size="12" customRespSize respSize="12">
            <Row>
              <Column size="12" customRespSize respSize="11">

                <Card width="100%" height="450px" color="white" shadow >
                  <Tabs >
                    <Header height="8%">
                      <TabList >
                        {yml.details.details_modules.map((item, index) => {
                          return (<Tab key={item.module_name} onClick={() => setCurrentIndex(index)}>
                            <Paragraph
                              color={Colors.white}
                              fs_xs="8px"
                              fs_sm="12px"
                              fs_md="12px"
                              fs_lg="14px"
                              fs_xl="16px"
                            >
                              {item.module_name}
                            </Paragraph>
                          </Tab>)
                        })
                        }
                      </TabList>
                    </Header>
                    <Body height="92%">
                      {yml.details.details_modules.map((item, i) => {
                        return (
                          <TabPanel key={item.title} onChange={() => setInd(i)}>
                            <Container width="fluid" p_xs="0" height="100%">
                              <Row height="20%">
                                <Column size="6" paddingLeft="20px" padding="15px 0" alignXs="left">
                                  <Paragraph color={Colors.black} fontSize="20px">{item.title}</Paragraph>
                                </Column>
                              </Row>
                              <Row height="20%" alignResp="left">
                                <Column size="3" paddingLeft="20px" customRespSize respSize="3" >
                                  <Paragraph color={Colors.gray} fontSize="14px">{yml.details.left_labels.description}</Paragraph>
                                </Column>
                                <Column size="6" customRespSize respSize="6" alignXs="left">
                                  <Paragraph
                                    color={Colors.gray}
                                    fs_xs="10px"
                                    fs_sm="12px"
                                    fs_md="10px"
                                    fs_lg="12px"
                                    fs_xl="16px"
                                  >{item.description}</Paragraph>
                                </Column>
                              </Row>
                              <Row height="20%" alignResp="left">
                                <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                  <Paragraph color={Colors.gray} fontSize="14px">{yml.details.left_labels.projects}</Paragraph>
                                </Column>
                                <Column size="6" customRespSize respSize="6" alignXs="left">
                                  <Paragraph
                                    color={Colors.gray}
                                    fs_xs="10px"
                                    fs_sm="12px"
                                    fs_md="10px"
                                    fs_lg="12px"
                                    fs_xl="16px"
                                  >{item.projects}</Paragraph>
                                </Column>
                              </Row>
                              <Row height="20%" alignResp="left">
                                <Column size="3" paddingLeft="20px" customRespSize respSize="3" alignXs="left">
                                  <Paragraph color={Colors.gray} fontSize="14px">{yml.details.left_labels.duration}</Paragraph>
                                </Column>
                                <Column size="6" customRespSize respSize="6" alignXs="left">
                                  <Paragraph
                                    color={Colors.gray}
                                    fs_xs="10px"
                                    fs_sm="12px"
                                    fs_md="10px"
                                    fs_lg="12px"
                                    fs_xl="16px"
                                  >{item.duration}</Paragraph>
                                </Column>
                              </Row>
                              <Row height="20%" >
                                <Column size="3" customRespSize respSize="2" padding="15px 0" image="no" color={Colors.lightGray} border="custom" customBorderRadius="0 0 0 1.25rem">
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph
                                        align="center"
                                        color={Colors.gray}
                                        fs_xs="10px"
                                        fs_sm="12px"
                                        fs_md="10px"
                                        fs_lg="12px"
                                        fs_xl="16px">{yml.details.left_labels.skills}</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1" >
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >1</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" image="no" color={Colors.lightGray} customRespSize respSize="1">
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >2</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >3</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 0 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >4</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >5</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 1 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >6</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%" align="center">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >7</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined}>
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >8</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                                <Column size="1" customRespSize respSize="1" image="no" color={currentIndex > 2 ? Colors.lightGray : undefined} border="custom" customBorderRadius="0 0 1.25rem 0">
                                  <Row align="around" height="100%">
                                    <Column size="12" alignSelf="center">
                                      <Paragraph align="center" color={Colors.gray} >9</Paragraph>
                                    </Column>
                                  </Row>
                                </Column>
                              </Row>
                            </Container>
                          </TabPanel>
                        )
                      })
                      }
                    </Body>
                  </Tabs>
                </Card >
              </Column>
            </Row>
          </Column>
        </Row>

        <section className="section" id="section-2"></section>
      </Wrapper>
      <Divider height="100px" />
      <Wrapper
        style="default"
      >
        <section className="section" id="section-3"></section>
        <Title
          size="10"
          title={yml.geeks_vs_others.heading}
          paragraph={yml.geeks_vs_others.sub_heading}
          primary
        />
        <Divider height="50px" />
        <GeeksVsOthers lang={data.allGeeksVsOthersYaml.edges} />
        <Divider height="100px" />
      </Wrapper>
      <Wrapper
        style="default"
      >


        <Title
          size="10"
          title={yml.prices.heading}
          paragraph={yml.prices.sub_heading}
          primary
        />
        <section className="section" id="section-4"></section>
        <PricesAndPayment type={pageContext.slug} lang={pageContext.lang} />
        <Divider height="100px" />
      </Wrapper>

      {yml.meta_info.slug === "full-stack-web-development-bootcamp-full-time" || yml.meta_info.slug === "desarrollo-web-full-stack-bootcamp-full-time" ? <Wrapper style="default">
        <Row align="center">
          <Title
            size="10"
            title={yml.typical.heading}
            paragraph={yml.typical.sub_heading}
            primary
          />
          <Divider height="50px" />
          <Column size="8" customRespSize respSize="12">
            <Row height="250px" align="center">
              <Column size="9" customRespSize respSize="12" alignSelf="center" height="100%" image="no"  >
                <Row height="30%" align="center">
                  <Stepper nonLinear activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepButton icon={<Circle width="14" stroke={Colors.yellow} fill={Colors.yellow} />} onMouseOver={handleStep(index)} completed={completed[index]}>
                          <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <Paragraph
                              fs_xs="10px"
                              fs_sm="10px"
                              fs_md="8px"
                              fs_lg="8px"
                              fs_xl="10px"
                              color={Colors.gray}>{label.time}</Paragraph>{label.icon}
                          </StepLabel>
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>

                </Row>
                <Divider height="20%" />
                <Row align="center" height="10%">
                  <H4 uppercase className={classes.test}
                    fs_xs="16px"
                    fs_sm="16px"
                    fs_md="16px"
                    fs_lg="16px"
                    fs_xl="24px"
                  >{getStepTitle(activeStep)}</H4>
                </Row>
                <Divider height="5%" />
                <Row align="center" height="35%">
                  <Column size="8" customRespSize respSize="8">
                    <Paragraph align="center" uppercase color={Colors.gray} className={classes.test}
                      fs_xs="14px"
                      fs_sm="14px"
                      fs_md="14px"
                      fs_lg="16px"
                      fs_xl="14px"
                    >{getStepContent(activeStep)}</Paragraph>
                  </Column>
                </Row>
              </Column>
            </Row>
          </Column>
        </Row>
      </Wrapper> : null}
      <Divider height="100px" />
      <Wrapper
        style="default"
      >
        <Title
          size="10"
          title={yml.alumni.heading}
          paragraph={yml.alumni.sub_heading}
          customParagraphSize="8"
          primary
        />
        <Divider height="50px" />
        <section className="section" id="section-5"></section>
        <Alumni hasTitle />
        <Divider height="100px" />
      </Wrapper>
      <Divider height="100px" />
    </div>
  </>
  )
};

export const query = graphql`
  query CourseQuery($file_name: String!, $lang: String!) {
    allCourseYaml(filter: { fields: { file_name: { eq: $file_name }, lang: { eq: $lang }}}) {
      edges{
        node{
            tagline
            button{
              syllabus_button_text
              syllabus_submit_text
              apply_button_text
              apply_button_link
            }
            meta_info{
                title
                description
                image
                keywords
                slug
            }
            geek_data {
              geek_force
              geek_pal
              geek_pal_heading
              geek_force_heading
            }
            details {
              heading
              sub_heading
              left_labels{
                description
                projects
                duration
                skills
              }
              details_modules {
                title
                projects
                slug
                module_name
                duration
                description
              }
            }
            geeks_vs_others{
              heading
              sub_heading
              sub_heading_link
          }
            prices{
              heading
              sub_heading
            }
            typical{
              heading
              sub_heading
              schedule{
                title
                time
                icon
                content
              }
            }
            alumni{
              heading
              sub_heading
            }
            sidebar{
              membership
              program
              geeks_vs_other
              pricing
              alumni
            }
        }
      }
    }
    allCredentialsYaml(filter: {lang: {eq: $lang}}) {
      edges {
        node {
          lang
          credentials {
            title
            slug
            value
            symbol
            symbol_position
          }
        }
      }
    }
    allGeeksVsOthersYaml(filter: {lang: {eq: $lang}}) {
      edges {
        node {
          lang
          
          info {
            features
            at4_Geeks
            industry_average
            tooltip
            icon
            slug
          }
          titles{
              featured
              at_geeks
              average
          }
          button{
              button_text
              button_link
          }
        }
      }
    }
    allLocationYaml{
      edges {
        node {
          id
          city
          hasFinancialsOption
          prices {
            full_time {
              center_section {
                plans {
                  months
                  payment
                  paymentInfo
                  provider
                  logo
                  message
                }
              }
            }
            part_time {
              slug
              duration
              center_section {
                plans {
                  months
                  payment
                  paymentInfo
                  provider
                  logo
                  message
                }
              }
            }
          }
        }
      }
    }
  }
`;



const Header = styled.div`
    background: black;
    border-radius: 1.25rem 1.25rem 0 0;
    height: ${props => props.height};
    color: white;
    font-family: 'lato', sans-serif;
    font-size: 14px;
    font-weight: 800;
    align-items: center;
`;
const Body = styled.div`
    background: white;
    height: ${props => props.height};
    border-radius: 0 0 1.25rem 1.25rem;`

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 5,
    left: 'calc(-50% + 5px)',
    right: 'calc(50% + 5px)',
    color: 'black'
  },
  active: {
    '& $line': {
      borderColor: Colors.white,
    },
  },
  completed: {
    '& $line': {
      borderColor: Colors.yellow,
    },
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: Colors.blue,
  },
  line: {
    borderColor: 'white',
    borderTopWidth: 1,
    borderRadius: 1,
  },
})(StepConnector);
const useQontoStepIconStyles = makeStyles({
  root: {
    color: 'black',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: Colors.blue,
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});
function QontoStepIcon (props) {
  const classes = useQontoStepIconStyles();
  const {active, completed} = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: Colors.yellow,
    width: 12,
    height: 12,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: Colors.yellow
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon (props) {
  const classes = useColorlibStepIconStyles();
  const {active, completed} = props;

  const icons = {
    1: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />,
    2: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />,
    3: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}
// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '80%',
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   completed: {
//     display: 'inline-block',
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
//   test: {
//     color: Colors.black
//   },
//   circle: {
//     width: 4,
//     height: 4,
//     borderRadius: '50%',
//     backgroundColor: Colors.blue,
//   },
// }));
function getSteps (day) {
  return [
    {icon: <Circle width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[0].time},
    {icon: <Coffee width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[1].time},
    {icon: <FileCode width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[2].time},
    {icon: <LaptopCode width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[3].time},
    {icon: <Utensils width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[4].time},
    {icon: <Dumbbell width="32" color={Colors.yellow} fill={Colors.yellow} />, time: day.typical.schedule[5].time},
  ];
}
export default BaseRender(Program);