import React, { useState, useEffect, useContext } from "react";
import SubscriptionContext,{useSubscriptionContext} from "../Context/SubscriptionContext.js";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../components/misc/Headings.js";
import { SectionDescription } from "../components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "../components/misc/Layouts.js";
import { ReactComponent as ArrowRightIcon } from "../images/arrow-right-icon.svg";
import { ReactComponent as SvgDecoratorBlob3 } from "../images/svg-decorator-blob-3.svg";
import { getUserData } from "../scripts/user_status.js";
import UpdateSubs from "./updateSubs.js";
import toast, { Toaster } from "react-hot-toast";

const config = require("../TFCConfig.json");
const Heading = tw(SectionHeading)``;
const Subheading = tw(SubheadingBase)`text-center mb-3`;
const Description = tw(SectionDescription)`text-center mx-auto`;
const ThreeColumnContainer = styled.div`
  ${tw`mt-10 flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`;
const UpdateSubsContainer = styled.div`
  ${tw`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`;

const Column = styled.div`
  ${tw`lg:w-1/3 max-w-xs`}
`;

const Card = styled.a`
  ${tw`flex flex-col items-center text-center h-full mx-4 px-4 py-8 rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105 `}
  .imageContainer {
    ${tw`text-center rounded-full p-4 bg-gray-100`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .title {
    ${tw`mt-4 font-bold text-xl leading-none`}
  }

  .description {
    ${tw`mt-4 text-sm font-medium text-secondary-300`}
  }

  .link {
    ${tw`mt-auto inline-flex items-center pt-5 text-sm font-bold text-primary-300 leading-none hocus:text-primary-900 transition duration-300`}
    .icon {
      ${tw`ml-2 w-4`}
    }
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-40`}
`;

const plans2id = (plan) => {
  if (plan === "Monthly Plan") {
    return 1;
  } else if (plan === "Yearly Plan") {
    return 2;
  } else if (plan == "Ultimate Monthly Plan") {
    return 3;
  } else if (plan == "Ultimate Yearly Plan") {
    return 4;
  }
}

const id2plans = ["", "Monthly Plan", "Yearly Plan", "Ultimate Monthly Plan", "Ultimate Yearly Plan"];


export default ({
}) => {
  const [subsUpdated, setsubsUpdated] = useState(false);
  const [futUpdated, setfutUpdated] = useState(false);

  const { isSub, setisSub} = useContext(SubscriptionContext);
  // const [isSub, setisSub] = useState(false);

  const [isFut, setisFut] = useState(false);
  const [currentSubUrl, setcurrentSubUrl] = useState("");
  const [futureSubUrl, setfutureSubUrl] = useState("");
  const [currentP, setcurrentP] = useState(0);
  const [futureP, setfutureP] = useState(0);
  const [currentEnd, setcurrentEnd] = useState(null);
  const user_url = localStorage.getItem("user_url");
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    getUserData(user_url, token)
      .then(data => {
        if (data.subscription) {
          setcurrentSubUrl(data.subscription);
          setisSub(true);
        }
        if (data.upcoming_plan) {
          setfutureSubUrl(data.upcoming_plan);
          setisFut(true);
        }
      })
      .catch(error => {
        toast.error(error.message, config.TOASTER_STYLE);
      });

  }, [subsUpdated, futUpdated]);

  useEffect(() => {
    if (isSub) {
      fetch(currentSubUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        }
      }).then(response => response.json())
        .then(data => {
          setcurrentEnd(data.expired_time.substr(0, 10));
          setcurrentP(data.plan.substr(-1));
        }).catch(error => {
          toast.error(error.message, config.TOASTER_STYLE);
        });
    }
  }, [currentSubUrl]);


  useEffect(() => {
    if (isFut) {
      fetch(futureSubUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        }
      }).then(response => response.json())
        .then(data => {
          setfutureP(data.plan.substr(-1));
        }).catch(error => {
          toast.error(error.message, config.TOASTER_STYLE);
        });
    }
  }, [isFut, futUpdated]);

  const HandleRefund = (event) => {
    event.preventDefault();
    fetch(currentSubUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }
    }).then(response => {
      if (response.status === 204) {
        toast.success("Refund Successful", config.TOASTER_STYLE);
        setisSub(false);
      }
      else {
        return response.json();
      }
    }).then(data => {
      if (data) {
        toast.error(data.detail, config.TOASTER_STYLE);
      }
    })
      .catch(error => {
        toast.error(error.message, config.TOASTER_STYLE);
      });
  }

  const HandleUnSubs = (event) => {
    event.preventDefault();
    fetch(futureSubUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      }
    }).then(response => {
      if (response.status === 204) {
        toast.success("Unsubscribe Successful", config.TOASTER_STYLE);
        setisFut(false);
        setisSub(false);
      }
      else {
        throw new Error("Unsubscribe Failed");
      }
    }).catch(error => {
      toast.error(error.message, config.TOASTER_STYLE);
    });
  }

  const handleUpdateSubs = (plan) => {
    if (isSub) {
      fetch(currentSubUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        }
      }).then(response => {
        if (response.status === 204) {
          fetch(config.SERVER_URL + '/subscriptions', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
              "plan": config.SERVER_URL + "/plans/" + plan
            })
          }).then(response => {
            if (response.status === 201) {
              toast.success("You are now subscribed to " + id2plans[plan], config.TOASTER_STYLE);
              setsubsUpdated(!subsUpdated);
              setfutUpdated(!futUpdated);
            }
            else {
              return response.json();
            }
          }
          )
            .then(data => {
              if (data) {
                toast.error(data.detail, config.TOASTER_STYLE);
              }
            }
            );
        } else {
          return response.json();
        }
      }).then(data => {
        if (data) {
          throw new Error(data.detail);
        }
      })
        .catch(error => {
          toast.error(error.message, config.TOASTER_STYLE);
        }
        );
    }
  }

  const handleUpdateFut = (plan) => {
    if (isFut) {
      fetch(futureSubUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
          "plan": config.SERVER_URL + "/plans/" + plan
        })
      }).then(response => {
        if (response.status === 200) {
          toast.success("You will be subscribed to " + id2plans[plan] + " in the future", config.TOASTER_STYLE);
          setfutUpdated(!futUpdated);
        }
        else {
          return response.json();
        }
      }
      )
        .then(data => {
          if (data) {
            throw new Error(data.detail);
          }
        })
        .catch(error => {
          alert(error);
        }
        );
    } else {
      fetch(config.SERVER_URL + "/upcoming-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify({
          "plan": config.SERVER_URL + "/plans/" + plan
        })
      }).then(response => {
        if (response.status === 201) {
          toast.success("You will be subscribed to " + id2plans[plan] + " in the future", config.TOASTER_STYLE);
          setisFut(true);
        }
        else {
          return response.json();
        }
      }
      ).then(data => {
        if (data) {
          throw new Error(data.detail);
        }
      }
      ).catch(error => {
        alert(error);
      }
      );
    }

  }
  console.log('isSub:');
  console.log(isSub);
  return (
    <>
      <Container>
        <Toaster />
        <ContentWithPaddingXl>
          {isSub ?
            <Card href={config.MAIN_PAGE_URL}>
              {<Subheading>Book a Course</Subheading>}
            </Card>
            :
            <Card href={config.MAIN_PAGE_URL}>
              {<Subheading>👉 Check out our subscription plans</Subheading>}
            </Card>}
          <Heading>{
            isSub ? "🥳 We are honored to have you here" : "🤔 You are not subscribed to any plan"
          }</Heading>
          {isSub ?
            <>
              <ThreeColumnContainer>
                <Column key={0}>
                  <Card onClick={HandleRefund}>
                    <span className="title">{
                      id2plans[currentP]
                    }</span>
                    <p className="description">👆Your Current Subscription Ends at {currentEnd}</p>
                    <span className="link">
                      <span>{"Cancel And Get Refund"}</span>
                      <ArrowRightIcon className="icon" />
                    </span>
                  </Card>
                </Column>

                {isFut ?
                  <Column key={1}>
                    <Card onClick={HandleUnSubs}>
                      <span className="title">{
                        id2plans[futureP]
                      }</span>
                      <p className="description">👆Your Next Subscription Starts at {currentEnd}</p>
                      <span className="link">
                        <span>{"Unsubscribe"}</span>
                        <ArrowRightIcon className="icon" />
                      </span>
                    </Card>
                  </Column>
                  : <>
                  </>}
              </ThreeColumnContainer>
              <br />
              <br />
              <UpdateSubsContainer>
                <UpdateSubs handleUpdateSubs={handleUpdateSubs} handleUpdateFut={handleUpdateFut} isFut={isFut} currentP={currentP} futureP={futureP} />
              </UpdateSubsContainer>
            </>
            : <></>}
        </ContentWithPaddingXl>
        <DecoratorBlob />
      </Container >
    </>
  );
};
