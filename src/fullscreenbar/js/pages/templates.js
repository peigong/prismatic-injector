window.template_PropertyMap = {};
window.page_PropertyMap = {};
window.page_EventMap = {};

top.tlbs = top.tlbs || {};
top.tlbs.templatePath = './fullscreenbar/css'
top.tlbs.templateData = '<script id="fullscreenbar" type="text/ng-template"><iholdert cid="appmainholder" pid="allappholder" templateurl="allappholder"></iholdert><ipage lload="0" pid="bimagenotify" templateurl="bimagenotify"></ipage><ipage lload="0" pid="caipopupnotify" templateurl="caipopupnotify"></ipage><ipage lload="0" pid="guidepage" templateurl="guidepage"></ipage><ipage pid="ibuoy" templateurl="ibuoy"></ipage><ipage lload="0" pid="ipopupfeedback" templateurl="ipopupfeedback"></ipage><ipage lload="0" pid="ipopupimgtext" templateurl="ipopupimgtext"></ipage><ipage lload="0" pid="ipopupmessage" templateurl="ipopupmessage"></ipage><ipage lload="0" pid="ipopuppage" templateurl="ipopuppage"></ipage><ipage lload="0" pid="ipopuppuretext" templateurl="ipopuppuretext"></ipage><ipage lload="0" pid="ipopupsign" templateurl="ipopupsign"></ipage><ipage lload="0" pid="ipopupsim" templateurl="ipopupsim"></ipage><ipage lload="0" pid="ipopupstorefee" templateurl="ipopupstorefee"></ipage><ipage lload="0" pid="ipopupwelcome" templateurl="ipopupwelcome"></ipage><ipage lload="0" pid="popupnotify" templateurl="popupnotify"></ipage></script><script id="allappholder" type="text/ng-template"><ftsiappholder cid="ftsiappholder" pid="ftsiappholdermasterpage" templateurl="ftsiappholdermasterpage"></ftsiappholder></script><script id="bimagenotify" type="text/ng-template"><iimagenotification cid="iimagenotification"></iimagenotification></script><script id="caipopupnotify" type="text/ng-template"><iholdert cid="popupnotifycai"><div cid="popupcaidiv" class="C60_fbar_popupcaidiv"><ipopuptop cid="ipopuptopcai"></ipopuptop><ipopupapprec cid="ipopupapprec"></ipopupapprec></div></iholdert></script><script id="guidepage" type="text/ng-template"><guidenotify cid="guidenotify"></guidenotify></script><script id="ibuoy" type="text/ng-template"><div cid="ibuoydiv"><buoy cid="buoy"></buoy></div></script><script id="ipopupfeedback" type="text/ng-template"><div cid="ipopupfeedbackdiv"><popupfeedback cid="popupfeedback"></popupfeedback></div></script><script id="ipopupimgtext" type="text/ng-template"><div cid="ipopupimgtextdiv"><popupimgtext cid="popupimgtext"></popupimgtext></div></script><script id="ipopupmessage" type="text/ng-template"><div cid="ipopupmessagediv"><popupmessage cid="popupmessage"></popupmessage></div></script><script id="ipopuppage" type="text/ng-template"><div cid="ipopupdiv"><ipopup cid="ipopup"></ipopup></div></script><script id="ipopuppuretext" type="text/ng-template"><div cid="ipopuppuretextdiv"><popuppuretext cid="popuppuretext"></popuppuretext></div></script><script id="ipopupsign" type="text/ng-template"><div cid="ipopupsigndiv"><popupimgtext cid="popupsign"></popupimgtext></div></script><script id="ipopupsim" type="text/ng-template"><div cid="ipopupsimdiv"><popuppuretext cid="popupsim"></popuppuretext></div></script><script id="ipopupstorefee" type="text/ng-template"><iholder cid="ipopupstorefee"><div cid="popupstorefeediv" class="C60_fbar_popupstorefeediv"><ipopuptop cid="ipopuptopstorefee"></ipopuptop><ipopuppkgrec cid="storefeepkgrec"></ipopuppkgrec></div></iholder></script><script id="ipopupwelcome" type="text/ng-template"><div cid="ipopupwelcomediv"><popupwelcome cid="popupwelcome"></popupwelcome></div></script><script id="popupnotify" type="text/ng-template"><iholdert cid="popupnotify"><div cid="popupdiv" class="C60_fbar_popupdiv"><ipopuptop cid="ipopuptop"></ipopuptop><ipopuppkgrec cid="notifypkgrec"></ipopuppkgrec></div></iholdert></script><script id="ftsiappholdermasterpage" type="text/ng-template"><imageholder cid="titlebackimage" class="c60_fbar_titlebackimage" ng-show="compData.JS.backable" param="compData.JS.backimageconfig"></imageholder><imageholder cid="titlebackimagetouch" ng-show="compData.JS.backable" param="compData.JS.backimageconfigtouch"></imageholder><imageholder cid="titlecloseimage" ng-show="compData.JS.closable" param="compData.JS.closeimageconfig"></imageholder><imageholder cid="titlecloseimagetouch" ng-show="compData.JS.closable" param="compData.JS.closeimageconfigtouch"></imageholder><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'cstore\')" pagesrcid="cstore" pid="cstore" templateurl="cstore"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'goldcoin\')" pagesrcid="goldcoin" pid="goldcoin" templateurl="goldcoin"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'iactivity\')" pagesrcid="iactivity" pid="iactivity" templateurl="iactivity"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'iappdownload\')" pagesrcid="iappdownload" pid="iappdownload" templateurl="iappdownload"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'iframepage\')" pagesrcid="iframepage" pid="iframepage" templateurl="iframepage"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'ifscoupon\')" pagesrcid="ifscoupon" pid="ifscoupon" templateurl="ifscoupon"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'iguess\')" pagesrcid="iguess" pid="iguess" templateurl="iguess"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'iguesspeek\')" pagesrcid="iguesspeek" pid="iguesspeek" templateurl="iguesspeek"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'imine\')" pagesrcid="imine" pid="imine" templateurl="imine"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'iminecoin\')" pagesrcid="iminecoin" pid="iminecoin" templateurl="iminecoin"></ipage><ipage backable="0" class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'imineset\')" pagesrcid="imineset" pid="imineset" templateurl="imineset"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'iminetui\')" pagesrcid="iminetui" pid="iminetui" templateurl="iminetui"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'imsgbox\')" pagesrcid="imsgbox" pid="imsgbox" templateurl="imsgbox"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'imy\')" pagesrcid="imy" pid="imy" templateurl="imy"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'isitenavigation\')" pagesrcid="isitenavigation" pid="isitenavigation" templateurl="isitenavigation"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'ispeedpage\')" pagesrcid="ispeedpage" pid="ispeedpage" templateurl="ispeedpage"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'istorefee\')" pagesrcid="istorefee" pid="istorefee" templateurl="istorefee"></ipage><ipage backable="0" class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'itaocanresult\')" pagesrcid="itaocanresult" pid="itaocanresult" templateurl="itaocanresult"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'npackageactivity\')" pagesrcid="npackageactivity" pid="npackageactivity" templateurl="npackageactivity"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'overbuy\')" pagesrcid="overbuy" pid="overbuy" templateurl="overbuy"></ipage><ipage class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'receive\')" pagesrcid="receive" pid="receive" templateurl="receive"></ipage><ipage backable="0" class="app-nav-animate" closable="0" lload="0" ng-class="getPageClass(\'summarypage\')" pagesrcid="summarypage" pid="summarypage" templateurl="summarypage"></ipage></script><script id="cstore" type="text/ng-template"><ititlefts cid="cstoretitle"></ititlefts><div cid="cstoreDiv"><store cid="store"></store></div><taocanresult cid="pkgsubresult"></taocanresult></script><script id="goldcoin" type="text/ng-template"><iholder canclick="0" cid="gcmainholder"><ititlefts cid="goldcointitle"></ititlefts><iholder canclick="0" cid="gcholder"><goldcoinlayout cid="goldcoinlayout"><money cid="gmoney"></money></goldcoinlayout><iapplink cid="gcapplink"></iapplink></iholder></iholder></script><script id="iactivity" type="text/ng-template"><iholder cid="immainholderiact"><ititlefts cid="activitytitle"></ititlefts><iholder cid="imholderiact"><activity cid="activity"></activity></iholder></iholder></script><script id="iappdownload" type="text/ng-template"><ititlefts cid="iapptitle"></ititlefts><imagelist cid="imagelistapp"></imagelist><iappsearch cid="iappsearch"></iappsearch><appdownload cid="appdownload"></appdownload></script><script id="iframepage" type="text/ng-template"><iholdert cid="ifpmainholder"><ititlefts cid="ifptitle"></ititlefts><iholdert cid="ifpholder"><iframeholder cid="iframeholder"></iframeholder></iholdert></iholdert></script><script id="ifscoupon" type="text/ng-template"><iholdert cid="ifscouponmainholder"><ititlefts cid="ifscoupontitle"></ititlefts><iholdert cid="ifscouponholder"><ifscoupon cid="ifscouponcomp"></ifscoupon></iholdert></iholdert></script><script id="iguess" type="text/ng-template"><iholder cid="iguessih"><ititlefts cid="iguessit"></ititlefts><iholder cid="iguessih2"><guess cid="guess"></guess></iholder></iholder></script><script id="iguesspeek" type="text/ng-template"><iholder cid="iguesspeekih"><ititlefts cid="iguesspeekit"></ititlefts><iholder cid="iguesspeekih2"><guesspeek cid="guesspeek"></guesspeek></iholder></iholder></script><script id="imine" type="text/ng-template"><iholder cid="immainholdermine"><ititlefts cid="minetitle"></ititlefts><iholder cid="imholdermine"><mine cid="cmine"></mine></iholder></iholder></script><script id="iminecoin" type="text/ng-template"><iholder canclick="0" cid="immainholder2"><ititlefts cid="minecointitle"></ititlefts><iholder canclick="0" cid="imholder2"><minecoin cid="cminecoin"></minecoin></iholder></iholder></script><script id="imineset" type="text/ng-template"><iholdert cid="imainholder3"><ititlefts cid="minesettitle"></ititlefts><iholdert cid="imholder3"><mineset cid="cmineset"></mineset></iholdert></iholdert></script><script id="iminetui" type="text/ng-template"><iholdert cid="immainholder4"><ititlefts cid="minetuititle"></ititlefts><iholdert cid="imholder4"><minetui cid="cminetui"></minetui></iholdert></iholdert></script><script id="imsgbox" type="text/ng-template"><iholder cid="imsgboxmainholder"><ititlefts cid="msgboxtitle"></ititlefts><iholder cid="imsgboxholder"><msgbox cid="msgbox"></msgbox></iholder></iholder></script><script id="imy" type="text/ng-template"><iholder cid="immainholdermy"><ititlefts cid="mytitle"></ititlefts><iholder cid="imholdermy"><my cid="cmy"></my></iholder></iholder></script><script id="isitenavigation" type="text/ng-template"><ititlefts cid="sitenavigationtitle"></ititlefts><sitenavigation cid="csitenavigation"></sitenavigation></script><script id="ispeedpage" type="text/ng-template"><ititlefts cid="ispeedpagetitle"></ititlefts><dashboard cid="idashboard"></dashboard></script><script id="istorefee" type="text/ng-template"><iholder cid="storefeemainholder"><ititlefts cid="istorefeetitle"></ititlefts><iholder cid="istorefeeholder"><storefee cid="storefee"></storefee></iholder></iholder></script><script id="itaocanresult" type="text/ng-template"><ititlefts cid="itaocanresulttitle"></ititlefts><div cid="itaocanresultdiv" class="itaocanresult itaocanresultwrap"><taocanresult cid="taocanresult"></taocanresult></div></script><script id="npackageactivity" type="text/ng-template"><iholder cid="immainholderpkgact"><ititlefts cid="nptitle"></ititlefts><iholder cid="imholderact"><imagelist cid="imagelist"></imagelist><packageactivity cid="packageactivity"></packageactivity></iholder></iholder></script><script id="overbuy" type="text/ng-template"><ititlefts cid="overbuytitle"></ititlefts><overed cid="buyovered"></overed></script><script id="receive" type="text/ng-template"><ititlefts cid="receivetitle"></ititlefts><receiveinfo cid="receiveinfo"></receiveinfo></script><script id="summarypage" type="text/ng-template"><div cid="summarypagewrapperdiv" class="c60_fbar_summarty_wrapper"><div cid="summarypagetopdiv" class="c60_fbar_indexpage_top"><summary cid="summary"></summary><fbtn cid="messagebtn"></fbtn><fbtn cid="speedbtn"></fbtn><fbtn cid="closebtn"></fbtn><tcdetail cid="taocandetail"></tcdetail></div><div cid="summarypagebottom" class="c60_fbar_indexpage_bottom"><repackholder cid="repackholder"></repackholder><iappiconholder cid="iappiconholder"></iappiconholder><togglebtn cid="detailbtn"></togglebtn></div></div><loadingmask cid="summaryload"></loadingmask><guide cid="guide"></guide></script>';
top.tlbs.preloadList = [];
window.template_PropertyMap["fullscreenbar_propertyTable"] = {
    "common": {
        "CSS": {
            "resizetype": "1"
        }
    }
};
window.page_PropertyMap["allappholder_propertyTable"] = {
    "appmainholder": {
        "CSS": {
            "position": "fixed",
            "-webkit-transition": "height .3s",
            "-moz-transition-timing-function": "ease-out",
            "width": "100%",
            "overflow": "hidden",
            "bottom": "0px",
            "-webkit-transition-timing-function": "ease-out",
            "left": "0",
            "z-index": "2047483647",
            "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
            "-webkit-backface-visibility": "visible",
            "-moz-transition": "height .3s"
        },
        "JS": {
            "animation": true,
            "clickable": false,
            "stateconfig": {
                "state": "0",
                "state0": {
                    "height": "0%"
                },
                "state1": {
                    "height": "100%"
                },
                "stylestates": "state0|state1"
            }
        }
    },
    "iappholder": {
        "CSS": {
            "position": "relative",
            "height": "100%",
            "width": "100%",
            "left": "0px",
            "top": "0px"
        },
        "JS": {
            "animation": false,
            "backimageconfig": {
                "CSS": {
                    "background-repeat": "no-repeat",
                    "background-size": "1.6em 1.6em",
                    "height": "1.6em",
                    "left": "0.6em",
                    "position": "absolute",
                    "top": "0.4em",
                    "width": "1.6em",
                    "z-index": "2047483649"
                },
                "JS": {
                    "clickable": true,
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-image": "none",
                            "cursor": "auto"
                        },
                        "state1": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/toback.png')",
                            "cursor": "pointer"
                        }
                    }
                }
            },
            "backimageconfigtouch": {
                "CSS": {
                    "display": "block",
                    "height": "2.4em",
                    "left": "0em",
                    "position": "absolute",
                    "top": "0em",
                    "width": "5em",
                    "z-index": "2047483650"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "clickable": true,
                    "stateconfig": {
                        "state": "0"
                    }
                }
            },
            "clickable": false,
            "closeimageconfig": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/close.png')",
                    "background-repeat": "no-repeat",
                    "background-size": "1.6em 1.6em",
                    "cursor": "pointer",
                    "height": "1.6em",
                    "position": "absolute",
                    "right": "0.6em",
                    "top": "0.4em",
                    "width": "1.6em",
                    "z-index": "2047483649"
                },
                "JS": {
                    "clickable": true,
                    "stateconfig": {
                        "state": "0"
                    }
                }
            },
            "closeimageconfigtouch": {
                "CSS": {
                    "display": "block",
                    "height": "2.4em",
                    "position": "absolute",
                    "right": "0em",
                    "top": "0em",
                    "width": "5em",
                    "z-index": "2047483649"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "clickable": true,
                    "stateconfig": {
                        "state": "0"
                    }
                }
            },
            "currentpageid": "0",
            "pagercompmapping": {
                "goldcoin": "goldcoinlayout"
            },
            "progresstextconfig": {
                "CSS": {
                    "background-color": "#4C4C4C",
                    "border-radius": ".1em .1em .1em .1em",
                    "color": "white",
                    "height": "2em",
                    "line-height": "1.8em",
                    "margin": "0 auto",
                    "position": "relative",
                    "text-align": "center",
                    "top": "6.75em",
                    "width": "8em"
                },
                "JS": {
                    "progresstext": "请等待..."
                }
            },
            "progresswindowconfig": {
                "CSS": {
                    "background": "rgba(0,0,0,0.498039)",
                    "display": "none",
                    "height": "100%",
                    "left": "0px",
                    "position": "fixed",
                    "top": "0px",
                    "width": "100%",
                    "z-index": "2047483647"
                }
            },
            "stateconfig": {
                "state": "0"
            }
        }
    }
};
window.page_PropertyMap["bimagenotify_propertyTable"] = {
    "iimagenotification": {
        "CSS": {
            "position": "fixed",
            "height": "100%",
            "width": "100%",
            "background": "rgba(0,0,0,0.5)",
            "left": "0",
            "display": "none",
            "z-index": "2047483647",
            "top": "0"
        },
        "JS": {
            "checkBtn": {
                "CSS": {
                    "background": "#10599e",
                    "border-radius": "13px",
                    "bottom": "8%",
                    "color": "#fff",
                    "font-size": "0.8em",
                    "height": "1.5em",
                    "line-height": "1.5em",
                    "padding": ".2em .3em",
                    "position": "absolute",
                    "right": "2%",
                    "text-align": "center",
                    "width": "20%"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": false,
                    "text": "我要办理"
                }
            },
            "closeTime": "15000",
            "closeholder": {
                "CSS": {
                    "-moz-border-radius": "3em",
                    "-webkit-border-radius": "3em",
                    "background": "rgba(0,0,0,0.5)",
                    "border-radius": "3em",
                    "color": "#fff",
                    "font-size": "0.9375em",
                    "height": "6em",
                    "line-height": "8.4em",
                    "position": "absolute",
                    "right": "-3em",
                    "text-align": "left",
                    "text-indent": "0.8em",
                    "top": "-3em",
                    "width": "6em"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "text": "关闭"
                }
            },
            "imageholder": {
                "CSS": {
                    "width": "100%"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "notificationholder": {
                "CSS": {
                    "bottom": "0",
                    "display": "block",
                    "left": "0",
                    "overflow": "hidden",
                    "position": "fixed",
                    "width": "100%",
                    "z-index": "2047483647"
                }
            }
        }
    }
};
window.page_PropertyMap["caipopupnotify_propertyTable"] = {
    "ipopuptopcai": {
        "CSS": {
            "position": "relative",
            "-webkit-box-sizing": "border-box",
            "width": "100%",
            "overflow": "hidden",
            "background": "#73d7bd",
            "-moz-box-sizing": "border-box",
            "padding": "1em",
            "box-sizing": "border-box"
        },
        "JS": {
            "c60_fbar_alert_txt": {
                "CSS": {
                    "color": "#047658",
                    "font-size": "1em",
                    "height": "6.3em",
                    "line-height": "1.3em",
                    "margin-top": "0.3em",
                    "overflow": "hidden",
                    "text-align": "left",
                    "width": "100%"
                }
            },
            "detailbtn": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                }
            },
            "flux_info": {
                "CSS": {
                    "color": "#fff",
                    "width": "100%"
                },
                "JS": {
                    "text": "4595"
                }
            },
            "ld_btn_link": {
                "CSS": {
                    "-moz-border-radius": "2.2em",
                    "-webkit-border-radius": "2.2em",
                    "background": "#4cc1a2",
                    "border-radius": "2.2em",
                    "color": "red",
                    "display": "inline-block",
                    "font-size": "1em",
                    "height": "2.2em",
                    "line-height": "2.2em",
                    "margin-top": "1em",
                    "text-align": "center",
                    "width": "72%"
                },
                "JS": {
                    "text": "查看详情"
                }
            },
            "popclose": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                },
                "text": "关闭"
            },
            "shengyu": {
                "JS": {
                    "text": "剩余",
                    "unit": "MB"
                }
            }
        }
    },
    "ipopupapprec": {
        "CSS": {
            "width": "100%"
        },
        "JS": {
            "flux_bag_recomm": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                }
            },
            "guess_mark_img": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/cai.png')",
                    "background-position": "left center",
                    "background-repeat": "no-repeat",
                    "background-size": "100% 100%"
                }
            },
            "mark_big_txt": {
                "text": "猜对送金币"
            },
            "mark_small_txt": {
                "text": "猜品牌"
            },
            "tanchuang_bottom": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "tuisong_name_txt": {
                "text": "中国移动上网管家"
            }
        }
    },
    "popupnotifycai": {
        "CSS": {
            "position": "fixed",
            "height": "100%",
            "width": "100%",
            "background": "rgba(0, 0, 0, 0.498039)",
            "left": "0",
            "display": "none",
            "z-index": "25555555555",
            "top": "0"
        },
        "JS": {
            "closetime": "6000"
        }
    }
};
window.page_PropertyMap["guidepage_propertyTable"] = {
    "guide": {
        "CSS": {},
        "JS": {
            "stepconfig": {
                "step1": {
                    "background": "url('" + top.tlbs.templatePath + "/images/yindao_ico_01.png')",
                    "background-position": "right top",
                    "background-repeat": "no-repeat",
                    "background-size": "50% 20%",
                    "height": "100%",
                    "position": "absolute",
                    "right": "0",
                    "top": "0",
                    "width": "100%"
                },
                "step2": {
                    "background": "url('" + top.tlbs.templatePath + "/images/yindao_ico_02.png')",
                    "background-position": "center 15%",
                    "background-repeat": "no-repeat",
                    "background-size": "90% 30%",
                    "height": "100%",
                    "left": "0",
                    "position": "absolute",
                    "top": "0",
                    "width": "100%"
                },
                "step3": {
                    "background": "url('" + top.tlbs.templatePath + "/images/yindao_ico_03.png')",
                    "background-position": "center 56%",
                    "background-repeat": "no-repeat",
                    "background-size": "95% 15%",
                    "height": "100%",
                    "position": "absolute",
                    "right": "0",
                    "top": "0",
                    "width": "100%"
                },
                "step4": {
                    "background": "url('" + top.tlbs.templatePath + "/images/yindao_ico_04.png')",
                    "background-position": "center 83%",
                    "background-repeat": "no-repeat",
                    "background-size": "50% 30%",
                    "height": "100%",
                    "left": "0",
                    "position": "absolute",
                    "top": "0",
                    "width": "100%"
                }
            }
        }
    }
};
window.page_PropertyMap["ibuoy_propertyTable"] = {
    "buoy": {
        "CSS": {},
        "JS": {
            "animation": {
                "duration": "1s",
                "func": "linear",
                "times": "infinite"
            },
            "autostatechangetimeout": "6000",
            "cdrConfig": {
                "uitracingcdr": {
                    "cdrType": "uitracingcdr",
                    "enable": true,
                    "storeData": false
                }
            },
            "defaultImageStyle": {
                "background-image": "url('" + top.tlbs.templatePath + "/images/green_i.png?V=1457438244919')",
                "background-repeat": "no-repeat"
            },
            "floatcount": "0",
            "jumpanimation": {
                "-moz-animation": "c60_fbar_buoy_jump_animation 1s 1 linear",
                "-o-animation": "c60_fbar_buoy_jump_animation 1s 1 linear",
                "-webkit-animation": "c60_fbar_buoy_jump_animation 1s 1 linear",
                "animation": "c60_fbar_buoy_jump_animation 1s 1 linear",
                "display": "block"
            },
            "state0": {
                "imageStyle": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/red_Bw.png')",
                    "background-repeat": "repeat-x"
                },
                "maxvalue": "20",
                "minvalue": "0",
                "valueStyle": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/red_i.png')",
                    "background-position": "center center",
                    "background-repeat": "no-repeat",
                    "background-size": "100% 100%",
                    "color": "#f24a4a"
                }
            },
            "state1": {
                "imageStyle": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/orange_Bw.png')",
                    "background-repeat": "repeat-x"
                },
                "maxvalue": "50",
                "minvalue": "20",
                "valueStyle": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/orange_i.png')",
                    "background-position": "center center",
                    "background-repeat": "no-repeat",
                    "background-size": "100% 100%",
                    "color": "#ff7d55"
                }
            },
            "state2": {
                "imageStyle": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/green_Bw.png')",
                    "background-repeat": "repeat-x"
                },
                "maxvalue": "100",
                "minvalue": "50",
                "valueStyle": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/green_i.png')",
                    "background-size": "100% 100%",
                    "color": "#40ad91"
                }
            },
            "stateconfig": {
                "state": "1",
                "state0": {
                    "opacity": "0.55",
                    "right": "0"
                },
                "state1": {
                    "opacity": "1",
                    "right": "0"
                }
            },
            "threshold": "100",
            "timerstate": true
        }
    }
};
window.page_PropertyMap["ipopupfeedback_propertyTable"] = {
    "popupfeedback": {
        "CSS": {},
        "JS": {
            "bg_pop_block": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "display": "block"
                        }
                    }
                }
            },
            "c60_fbar_ncp_tit_close": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_ncp_tit_txt": {
                "JS": {
                    "text": "反馈回复"
                }
            },
            "c60_fbar_ncpb_txt": {
                "JS": {
                    "text0": "Q：",
                    "text1": "A："
                }
            }
        }
    }
};
window.page_PropertyMap["ipopupimgtext_propertyTable"] = {
    "popupimgtext": {
        "CSS": {},
        "JS": {
            "closetime": "15000",
            "popupbtnconfig": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "linktype": "0",
                    "stateconfig": {
                        "state0": {
                            "color": "#222",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "state1": {
                            "color": "#ff7d55",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "title0": "关闭",
                        "title1": "查看详情"
                    },
                    "url": "http://www.10086.cn/"
                }
            },
            "popuptitleconfig": {
                "JS": {
                    "stateconfig": {
                        "state0": {
                            "color": "#222",
                            "font-size": "1.2em",
                            "margin-left": "0.3em"
                        },
                        "state1": {
                            "color": "#222",
                            "font-size": "1em",
                            "margin-left": "0.36em",
                            "margin-top": "0.3em"
                        },
                        "state2": {
                            "background-size": "6em 6em",
                            "display": "inline-block",
                            "height": "6em",
                            "width": "6em"
                        }
                    }
                }
            }
        }
    }
};
window.page_PropertyMap["ipopupmessage_propertyTable"] = {
    "popupmessage": {
        "CSS": {},
        "JS": {
            "closetime": "15000",
            "popupbtnconfig": {
                "JS": {
                    "stateconfig": {
                        "state0": {
                            "color": "#222",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "title0": "知道了，谢谢"
                    }
                }
            },
            "popupcloseconfig": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "popupcolorconfig": {
                "JS": {
                    "stateconfig": {
                        "state": {
                            "color": "#222",
                            "font-size": ".9625em"
                        }
                    }
                }
            },
            "popuptitleconfig": {
                "JS": {
                    "stateconfig": {
                        "state": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/chinamobile.jpg')",
                            "background-position": "left center",
                            "background-repeat": "no-repeat",
                            "background-size": "2.4em 2.4em",
                            "color": "#222",
                            "font-size": "0.9625em",
                            "height": "2.4em",
                            "line-height": "2.4em",
                            "padding-left": "3em"
                        },
                        "title": "中国移动上网管家温馨提醒您："
                    }
                }
            }
        }
    }
};
window.page_PropertyMap["ipopuppage_propertyTable"] = {
    "ipopup": {
        "CSS": {
            "height": "12em"
        },
        "JS": {
            "bg_pop_block": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "display": "block"
                        }
                    }
                }
            },
            "bodyconfig": {
                "JS": {
                    "text": "1）签到一天获<div style='color:#ff7d55;display:inline-block;'>1</div>个金币，第二天签到获<div style='color:#ff7d55;display:inline-block;'>3</div>个金币</br>2）依次递推，最高可得<div style='color:#ff7d55;display:inline-block;'>9</div>个金币</br>3）<div style='color:#ff7d55;display:inline-block;'>签到中断</div>后，重新从1个金币开始</br>"
                }
            },
            "bottomtextconfig": {
                "CSS": {
                    "text-align": "center"
                },
                "JS": {
                    "text": "亲，可以用金币参加<div style='color:#ff7d55;display:inline-block;' ng-click='applink('iminecoin')'>[兑换流量]</div>活动哦！"
                }
            },
            "cdrConfig": {
                "uitracingcdr": {
                    "cdrType": "uitracingcdr",
                    "enable": true,
                    "storeData": false
                }
            },
            "titleconfig": {
                "JS": {
                    "text": "签到有礼规则说明"
                }
            }
        }
    }
};
window.page_PropertyMap["ipopuppuretext_propertyTable"] = {
    "popuppuretext": {
        "CSS": {},
        "JS": {
            "closetime": "6000",
            "popupbtnconfig": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "linktype": "2",
                    "stateconfig": {
                        "state0": {
                            "color": "#222",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "state1": {
                            "color": "#ff7d55",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "title0": "关闭",
                        "title1": "查看详情"
                    },
                    "url": "summarypage"
                }
            },
            "popupcolorconfig": {
                "JS": {
                    "stateconfig": {
                        "state": {
                            "color": "#222",
                            "font-size": ".9625em"
                        }
                    }
                }
            },
            "popuptitleconfig": {
                "JS": {
                    "stateconfig": {
                        "state": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/chinamobile.jpg')",
                            "background-position": "left center",
                            "background-repeat": "no-repeat",
                            "background-size": "2.4em 2.4em",
                            "color": "#222",
                            "font-size": "0.9625em",
                            "height": "2.4em",
                            "line-height": "2.4em",
                            "padding-left": "3em"
                        },
                        "title": "中国移动上网管家温馨提醒您："
                    }
                }
            }
        }
    }
};
window.page_PropertyMap["ipopupsign_propertyTable"] = {
    "popupsign": {
        "CSS": {},
        "JS": {
            "closetime": "15000",
            "popupbtnconfig": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "linktype": "2",
                    "stateconfig": {
                        "state0": {
                            "color": "#222",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "state1": {
                            "color": "#ff7d55",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "title0": "知道了，谢谢",
                        "title1": "去签到"
                    },
                    "url": "imy"
                }
            },
            "popuptitleconfig": {
                "JS": {
                    "stateconfig": {
                        "state0": {
                            "color": "#222",
                            "font-size": "1.2em",
                            "margin-left": "0.3em"
                        },
                        "state1": {
                            "color": "#222",
                            "font-size": "1em",
                            "margin-left": "0.36em",
                            "margin-top": "0.3em"
                        },
                        "state2": {
                            "background-size": "6em 6em",
                            "display": "inline-block",
                            "height": "6em",
                            "width": "6em"
                        }
                    }
                }
            }
        }
    }
};
window.page_PropertyMap["ipopupsim_propertyTable"] = {
    "popupsim": {
        "CSS": {},
        "JS": {
            "closetime": "6000",
            "popupbtnconfig": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "linktype": "0",
                    "stateconfig": {
                        "state0": {
                            "color": "#222",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "state1": {
                            "color": "#ff7d55",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "title0": "知道了",
                        "title1": "去看看"
                    },
                    "url": "http://www.10086.cn/"
                }
            },
            "popupcolorconfig": {
                "JS": {
                    "stateconfig": {
                        "state": {
                            "color": "#222",
                            "font-size": ".9625em"
                        }
                    }
                }
            },
            "popuptitleconfig": {
                "JS": {
                    "stateconfig": {
                        "state": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/chinamobile.jpg')",
                            "background-position": "left center",
                            "background-repeat": "no-repeat",
                            "background-size": "2.4em 2.4em",
                            "color": "#222",
                            "font-size": "0.9625em",
                            "height": "2.4em",
                            "line-height": "2.4em",
                            "padding-left": "3em"
                        },
                        "title": "中国移动上网管家温馨提醒您："
                    }
                }
            }
        }
    }
};
window.page_PropertyMap["ipopupstorefee_propertyTable"] = {
    "storefeepkgrec": {
        "CSS": {
            "width": "100%"
        },
        "JS": {
            "colorconfig": {
                "color0": "#73d7bd",
                "color1": "rgb(255, 125, 85)"
            },
            "flux_bag_recomm": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                }
            },
            "linkconfig": {
                "linktype": "2",
                "url": "istorefee"
            },
            "textconfig": {
                "text0": "当前",
                "text1": "升级"
            },
            "tuisong_name_txt": {
                "text": "中国移动上网管家"
            }
        }
    },
    "ipopuptopstorefee": {
        "CSS": {
            "position": "relative",
            "-webkit-box-sizing": "border-box",
            "width": "100%",
            "overflow": "hidden",
            "background": "#73d7bd",
            "-moz-box-sizing": "border-box",
            "padding": "1em",
            "box-sizing": "border-box"
        },
        "JS": {
            "alert_texts": {
                "CSS": {
                    "color": "#fff",
                    "font-size": "0.8em",
                    "text-indent": "2em",
                    "width": "99%"
                }
            },
            "colorconfig": {
                "color0": "#73d7bd",
                "color1": "rgb(255, 125, 85)"
            },
            "detailbtn": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                }
            },
            "flux_info": {
                "CSS": {
                    "color": "#fff",
                    "width": "100%"
                },
                "JS": {
                    "text": "4595"
                }
            },
            "ld_btn_link": {
                "CSS": {
                    "-moz-border-radius": "2.2em",
                    "-webkit-border-radius": "2.2em",
                    "background": "#4cc1a2",
                    "border-radius": "2.2em",
                    "color": "red",
                    "display": "inline-block",
                    "font-size": "1em",
                    "height": "2.2em",
                    "line-height": "2.2em",
                    "margin-top": "1em",
                    "text-align": "center",
                    "width": "72%"
                },
                "JS": {
                    "linktype": "2",
                    "text": "查看详情",
                    "url": "istorefee"
                }
            },
            "popclose": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                },
                "text": "关闭"
            },
            "shengyu": {
                "JS": {
                    "text": "剩余",
                    "unit": "MB"
                }
            },
            "textconfig": {
                "text0": "当前",
                "text1": "升级"
            },
            "tipstext": {
                "text": "尊敬的客户："
            }
        }
    },
    "ipopupstorefee": {
        "CSS": {
            "position": "fixed",
            "height": "100%",
            "width": "100%",
            "background": "rgba(0, 0, 0, 0.498039)",
            "left": "0",
            "display": "none",
            "z-index": "2047483647",
            "top": "0"
        },
        "JS": {
            "closetime": "6000"
        }
    }
};
window.page_PropertyMap["ipopupwelcome_propertyTable"] = {
    "popupwelcome": {
        "CSS": {},
        "JS": {
            "closetime": "6000",
            "popupbeginconfig": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "stateconfig": {
                        "state": {
                            "-moz-border-radius": "2em",
                            "-webkit-border-radius": "2em",
                            "background-color": "#4cc1a2",
                            "border-radius": "2em",
                            "color": "#fff",
                            "font-size": "1em",
                            "height": "2em",
                            "line-height": "2em",
                            "width": "85%"
                        },
                        "text": "开始体验"
                    }
                }
            },
            "popupbgconfig": {
                "JS": {
                    "stateconfig": {
                        "state": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/c60_fbar_popimg01.png')",
                            "background-position": "left center",
                            "background-repeat": "no-repeat",
                            "background-size": "19.4em 20.7em",
                            "height": "20.7em",
                            "left": "50%",
                            "margin-left": "-9.7em",
                            "margin-top": "-10.35em",
                            "top": "50%",
                            "width": "19.4em"
                        }
                    }
                }
            },
            "popupcloseconfig": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "stateconfig": {
                        "state": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/c60_fbar_piru_close.png')",
                            "background-position": "left center",
                            "background-repeat": "no-repeat",
                            "background-size": "1.8em 1.8em",
                            "bottom": "-0.9em",
                            "height": "1.8em",
                            "right": "0.8em",
                            "width": "1.8em"
                        }
                    }
                }
            },
            "popupdescconfig": {
                "JS": {
                    "stateconfig": {
                        "state": {
                            "color": "#222",
                            "font-size": "0.915em",
                            "height": "7.5em",
                            "line-height": "1.8em",
                            "margin-bottom": "0.5em",
                            "overflow": "hidden",
                            "text-align": "left"
                        }
                    }
                }
            }
        }
    }
};
window.page_PropertyMap["popupnotify_propertyTable"] = {
    "popupnotify": {
        "CSS": {
            "position": "fixed",
            "height": "100%",
            "width": "100%",
            "background": "rgba(0, 0, 0, 0.498039)",
            "left": "0",
            "display": "none",
            "z-index": "25555555555",
            "top": "0"
        },
        "JS": {
            "closetime": "15000"
        }
    },
    "ipopuptop": {
        "CSS": {
            "position": "relative",
            "-webkit-box-sizing": "border-box",
            "width": "100%",
            "overflow": "hidden",
            "background": "#73d7bd",
            "-moz-box-sizing": "border-box",
            "padding": "1em",
            "box-sizing": "border-box"
        },
        "JS": {
            "c60_fbar_alert_txt": {
                "CSS": {
                    "color": "#047658",
                    "font-size": "1em",
                    "height": "6.3em",
                    "line-height": "1.3em",
                    "margin-top": "0.3em",
                    "overflow": "hidden",
                    "text-align": "left",
                    "width": "100%"
                }
            },
            "detailbtn": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                }
            },
            "flux_info": {
                "CSS": {
                    "color": "#fff",
                    "width": "100%"
                },
                "JS": {
                    "text": "4595"
                }
            },
            "ld_btn_link": {
                "CSS": {
                    "-moz-border-radius": "2.2em",
                    "-webkit-border-radius": "2.2em",
                    "background": "#4cc1a2",
                    "border-radius": "2.2em",
                    "color": "red",
                    "display": "inline-block",
                    "font-size": "1em",
                    "height": "2.2em",
                    "line-height": "2.2em",
                    "margin-top": "1em",
                    "text-align": "center",
                    "width": "72%"
                },
                "JS": {
                    "text": "查看详情"
                }
            },
            "popclose": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                },
                "text": "关闭"
            },
            "shengyu": {
                "JS": {
                    "text": "剩余",
                    "unit": "MB"
                }
            }
        }
    },
    "notifypkgrec": {
        "CSS": {
            "width": "100%"
        },
        "JS": {
            "colorconfig": {
                "color0": "#90c666",
                "color1": "#e075bd"
            },
            "flux_bag_recomm": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": true
                    }
                }
            },
            "tuisong_name_txt": {
                "text": "中国移动流量助手"
            },
            "unitconfig": {
                "unit": "￥",
                "unitisShow": true
            }
        }
    }
};
window.page_PropertyMap["ftsiappholdermasterpage_propertyTable"] = {};
window.page_PropertyMap["cstore_propertyTable"] = {
    "pkgsubresult": {
        "CSS": {
            "position": "absolute",
            "height": "100%",
            "width": "100%",
            "background-color": "#fff",
            "left": "0",
            "display": "none",
            "z-index": "2047483648",
            "top": "2.4em"
        },
        "JS": {
            "c60_fbar_link_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "loadingtext": {
                "JS": {
                    "textdata": "套餐订购请求处理中~~~"
                }
            },
            "resultsconfig": {
                "JS": {
                    "0": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/success.jpg'",
                        "tipstxt": "OK，订购成功！我就那么酷，不服憋着!"
                    },
                    "1-10A-0-026": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "已有业务请求受理中"
                    },
                    "1-10A-1-401": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "余额不足"
                    },
                    "1-10A-1-404": {
                        "action": "3",
                        "btntxt": "去首页看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "现有业务与订购业务互斥"
                    },
                    "1-10A-1-406": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "您好！由于您目前没有开通4G数据流量套餐包，因此无法办理4G数据流量加油包，建议您先开通4G数据流量套餐包。"
                    },
                    "1-10A-1-407": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "初始密码不能办理业务！"
                    },
                    "1-10A-1-408": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "黑名单客户不能办理当前业务！"
                    },
                    "1-10A-1-409": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "没有此优惠!"
                    },
                    "1-10A-1-410": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "您是预开未返单用户，不能办理此业务！"
                    },
                    "1-FFF-1-AAA": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "对不起，订购失败，请稍后再试!"
                    },
                    "1-FFF-1-FFE": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "对不起，操作太频繁，请稍后再试!"
                    },
                    "1-FFF-1-FFF": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "对不起，订购失败，请稍后再试!"
                    },
                    "1": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/404.jpg'",
                        "tipstxt": "不要阻止我，我要去天台思考人生!"
                    },
                    "10": {
                        "action": "3",
                        "btntxt": "去首页看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/success.jpg'",
                        "tipstxt": "OK，订购成功！我就那么酷，不服憋着!"
                    },
                    "2": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/gongchengshi.jpg'",
                        "tipstxt": "工程狮正在奋力开采中，敬请期待!"
                    },
                    "3": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "我也是醉了，系统出小差了!"
                    },
                    "default": {
                        "action": "3",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "我也是醉了，系统出小差了!"
                    },
                    "defaultErrorCode": "1-001-1-101"
                }
            }
        }
    },
    "store": {
        "CSS": {},
        "JS": {
            "buynowbtnconfig": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": true
                        }
                    },
                    "stateconfig": {
                        "state": {
                            "-moz-border-radius": "2.3em",
                            "-webkit-border-radius": "2.3em",
                            "background": "#ff7d55",
                            "border": "none",
                            "border-radius": "2.3em",
                            "color": "#fff",
                            "font-size": "1.1em",
                            "height": "2.3em",
                            "margin": "0.625em 20%",
                            "width": "60%"
                        },
                        "state1": {
                            "-moz-border-radius": "2.3em",
                            "-webkit-border-radius": "2.3em",
                            "background": "#CCC",
                            "border": "none",
                            "border-radius": "2.3em",
                            "color": "#fff",
                            "font-size": "1.1em",
                            "height": "2.3em",
                            "margin": "0.625em 20%",
                            "width": "60%"
                        },
                        "text0": "立即订购",
                        "text1": "预约升档"
                    }
                }
            },
            "changingtips": "查询中...",
            "checkCode": {
                "JS": {
                    "curNum": "请选择一位验证码",
                    "defaultNum": "123456",
                    "errorTips": "验证码选择错误",
                    "isShow": false,
                    "nums": "123456"
                }
            },
            "confirmPopupAutohide": "10",
            "directBuy": true,
            "nomoreconfig": {
                "JS": {
                    "no_more_desc": "抱歉，暂没有适合您的套餐<br/>请您看看其他类别的套餐",
                    "no_more_title": "no more..."
                }
            },
            "nopkgtips": "对不起，未找到指定套餐。",
            "packageIndex": "0",
            "packagedescstate": {
                "JS": {
                    "keyconfig": {
                        "1": {
                            "key": "语音"
                        },
                        "2": {
                            "key": "流量"
                        },
                        "3": {
                            "key": "短信"
                        }
                    },
                    "stateconfig": {
                        "state0": {
                            "display": "none",
                            "margin-bottom": "0"
                        },
                        "state1": {
                            "border": "block",
                            "margin-bottom": "0.625em"
                        },
                        "state2": {
                            "border": "block",
                            "margin-bottom": "0"
                        }
                    },
                    "traffickeyconfig": "2"
                }
            },
            "packageeffectstate": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "specialdesc": "选择[当月生效]或[永久生效],此套餐立即生效",
                    "specialdescstyle": {
                        "clear": "both",
                        "color": "#73d7bd",
                        "font-size": "0.75em",
                        "padding-top": "0.5em"
                    },
                    "specialstate": "0",
                    "specialstateconfig": {
                        "0": {
                            "value1": "当月生效",
                            "value2": "永久生效"
                        },
                        "1": {
                            "value": "预约生效"
                        }
                    },
                    "stateconfig": {
                        "0": {
                            "value": "立即生效"
                        },
                        "1": {
                            "value": "预约生效"
                        },
                        "2": {
                            "value": "立即生效/预约生效"
                        }
                    }
                }
            },
            "packagetitlebgstate": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "stateconfig": {
                        "settimer": "60000",
                        "state0": {
                            "border": "1px solid #D8D8D8",
                            "margin-bottom": "1.5em",
                            "padding-bottom": "0.625em"
                        },
                        "state1": {
                            "border": "1px solid #FF7043",
                            "margin-bottom": "1.5em",
                            "padding-bottom": "0.625em"
                        },
                        "state2": {
                            "border": "1px solid #D8D8D8",
                            "margin-bottom": "-0.5em",
                            "padding-bottom": "1.25em"
                        },
                        "state3": {
                            "border": "1px solid #FF7043",
                            "margin-bottom": "-0.5em",
                            "padding-bottom": "0.625em"
                        }
                    }
                }
            },
            "packagetitlestate": {
                "JS": {
                    "stateconfig": {
                        "state0": {
                            "background": "#73d7bd"
                        },
                        "state1": {
                            "background": "#FF7043"
                        },
                        "state2": {
                            "background": "#CCC"
                        }
                    }
                }
            },
            "pkgnofoundautohide": "2",
            "popblockconfig": {
                "JS": {
                    "btnconfig": {
                        "state0": {
                            "color": "#222",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "state1": {
                            "color": "#ff7d55",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        }
                    },
                    "effectivewayconfig": {
                        "state": "1",
                        "state0": {
                            "background": "#73d7bd",
                            "color": "#fff",
                            "font-size": ".875em",
                            "line-height": "2.5em",
                            "text-align": "center"
                        },
                        "state1": {
                            "background": "#eee",
                            "color": "#555",
                            "font-size": ".875em",
                            "line-height": "2.5em",
                            "text-align": "center"
                        },
                        "state2": {
                            "color": "#222"
                        }
                    },
                    "icoconfig": {
                        "background-image": "url('" + top.tlbs.templatePath + "/images/haveatea.jpg')",
                        "background-repeat": "no-repeat",
                        "background-size": "3.73em 3.73em",
                        "height": "3.73em",
                        "width": "3.73em"
                    },
                    "packagenameconfig": {
                        "color": "#73d7bd",
                        "padding": "0 0 0 0.25em"
                    },
                    "uitracingcancel": {
                        "cdrConfig": {
                            "uitracingcdr": {
                                "cdrType": "uitracingcdr",
                                "enable": true,
                                "storeData": false
                            }
                        }
                    },
                    "uitracingsubmit": {
                        "cdrConfig": {
                            "uitracingcdr": {
                                "cdrType": "uitracingcdr",
                                "enable": true,
                                "storeData": false
                            }
                        }
                    }
                }
            },
            "tabTitleconfig": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "index": "0",
                    "maxdisplaynum": "4",
                    "stateconfig": {
                        "state0": {
                            "border-bottom": "2px solid #f8f8f8",
                            "color": "#222"
                        },
                        "state1": {
                            "border-bottom": "2px solid #ff7043",
                            "color": "#ff7043"
                        }
                    }
                }
            },
            "tabcategoryIndex": "0"
        }
    },
    "cstoretitle": {
        "CSS": {
            "border-bottom-color": "#f8f8f8"
        },
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "套餐商店"
                }
            }
        }
    }
};
window.page_PropertyMap["goldcoin_propertyTable"] = {
    "gmoney": {
        "CSS": {},
        "JS": {
            "bg_black_pop": {
                "JS": {
                    "desc": "您正在签到，请稍等...",
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "bottom": "40%",
                            "display": "block"
                        },
                        "time": "15"
                    }
                }
            },
            "c60_fbar_imgTitle_Btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_left_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_link_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_money_result_con": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "showconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    },
                    "statusconfig": {
                        "status": "1",
                        "status0": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/success.jpg'",
                            "tipstxt": "OK，订购成功！我就那么酷，不服憋着"
                        },
                        "status1": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/404.jpg'",
                            "tipstxt": "不要阻止我，我要去天台思考人生"
                        },
                        "status2": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/gongchengshi.jpg'",
                            "tipstxt": "攻程狮正在奋力开采中，敬请期待!"
                        },
                        "status3": {
                            "btntxt": "返回看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                            "tipstxt": "我也是醉了，系统出小差了"
                        }
                    }
                }
            },
            "c60_fbar_right_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "errorcode": "default",
            "goldIcon": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/img000.jpg')",
                    "background-repeat": "no-repeat",
                    "background-size": "6em 6em",
                    "display": "inline-block",
                    "height": "6em",
                    "width": "6em"
                }
            },
            "icoTitleDesc": {
                "CSS": {
                    "-moz-background-size": "100%",
                    "-o-background-size": "42%",
                    "-webkit-background-size": "3.75em 3.75em",
                    "background-image": "url('" + top.tlbs.templatePath + "/images/cai.png')",
                    "background-position": "left center",
                    "background-repeat": "no-repeat",
                    "color": "#f17049",
                    "height": "3.75em",
                    "line-height": "1.25em",
                    "margin": "0 auto",
                    "padding": "0.75em 0 0.75em 4.5em",
                    "text-align": "center"
                }
            },
            "index": "0",
            "sign": {
                "isFailed": false,
                "option": {
                    "option0": "继续签",
                    "option1": "签别的",
                    "option2": "逛一逛"
                },
                "status": {
                    "status0": "2015521",
                    "status1": "2015525",
                    "status2": "2015526",
                    "status3": "2015527",
                    "status4": "9206",
                    "status5": "other_error"
                },
                "text": {
                    "text0": {
                        "signRes": "OK！恭喜您签到成功，",
                        "signTips": "送您",
                        "signTips1": "个金币，已经存入您的账户。"
                    },
                    "text1": {
                        "signRes": "Sorry，今天",
                        "signTips": "金币已经被抢空了，明天再来吧~"
                    },
                    "text2": {
                        "signRes": "Sorry！",
                        "signTips": "企业签到失败请稍后继续签到"
                    }
                }
            }
        }
    },
    "gcholder": {
        "CSS": {
            "height": "95%",
            "width": "100%",
            "background": "#ff7d55"
        },
        "JS": {}
    },
    "goldcoinlayout": {
        "CSS": {
            "position": "relative",
            "overflow-y": "hidden",
            "height": "100%",
            "text-align": "center",
            "width": "100%",
            "background": "#ff7d55"
        },
        "JS": {
            "buttonEnable": false,
            "c60_fbar_goldcoin_result_con": {
                "JS": {
                    "showconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    },
                    "statusconfig": {
                        "status": "1",
                        "status1": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/404.jpg'",
                            "tipstxt": "不要阻止我，我要去天台思考人生"
                        },
                        "status2": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/gongchengshi.jpg'",
                            "tipstxt": "攻程狮正在奋力开采中，敬请期待!"
                        },
                        "status3": {
                            "btntxt": "返回看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                            "tipstxt": "我也是醉了，系统出小差了"
                        }
                    }
                }
            },
            "c60_fbar_link_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "circle": {
                "CSS": {
                    "-moz-border-radius": "100%",
                    "-webkit-border-radius": "100%",
                    "background": "#fff",
                    "border-radius": "100%",
                    "height": "100%",
                    "line-height": "8em",
                    "position": "relative",
                    "text-align": "center",
                    "width": "100%"
                }
            },
            "circleholder": {
                "CSS": {
                    "-moz-border-radius": "8.9em",
                    "-webkit-border-radius": "8.9em",
                    "background": "#ff7d55",
                    "border": "0.25em solid #fff",
                    "border-bottom-left-radius": "100%",
                    "border-bottom-right-radius": "100%",
                    "border-radius": "8.9em",
                    "border-top-left-radius": "100%",
                    "border-top-right-radius": "99%",
                    "height": "8.9em",
                    "margin": "0 auto",
                    "margin-top": "4em",
                    "padding": "0.45em",
                    "text-align": "center",
                    "width": "8.9em"
                }
            },
            "circletxt1": {
                "CSS": {
                    "color": "#222",
                    "font-size": "0.875em",
                    "left": "0",
                    "line-height": "normal",
                    "position": "absolute",
                    "text-align": "center",
                    "top": "1.8em",
                    "width": "100%",
                    "z-index": "2047483647"
                },
                "JS": {
                    "text": "我的金币"
                }
            },
            "circletxt2": {
                "CSS": {
                    "color": "#222",
                    "font-size": "2em",
                    "line-height": "4em",
                    "padding-top": "0.2em",
                    "text-align": "center"
                },
                "JS": {
                    "datamapping": "respparam.total",
                    "text": "0"
                }
            },
            "circletxt3": {
                "CSS": {
                    "bottom": "1em",
                    "color": "#73d7bd",
                    "font-size": "0.875em",
                    "left": "0",
                    "line-height": "normal",
                    "position": "absolute",
                    "text-align": "center",
                    "width": "100%",
                    "z-index": "2047483647"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "text": "兑换流量"
                }
            },
            "coinbtn1": {
                "CSS": {
                    "margin-top": "1em",
                    "text-align": "center",
                    "width": "100%"
                },
                "JS": {
                    "cdaysdatamapping": "respparam.cdays",
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "datamapping": "respparam.signflag",
                    "isEnables": "0"
                }
            },
            "coinbtn1_second": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "coinbtn1text": {
                "CSS": {
                    " -moz-border-radius": "0.4em",
                    "-webkit-border-radius": "0.4em",
                    "background": "#fff",
                    "border-radius": "0.4em",
                    "color": "#222",
                    "display": "inline-block",
                    "font-size": "0.875em",
                    "height": "3.5em",
                    "line-height": "3.5em",
                    "text-align": "center",
                    "width": "45%"
                },
                "JS": {
                    "text": "签到送金币",
                    "text1": "恭喜您签到成功",
                    "text2": "已连续签到cdays天"
                }
            },
            "coinbtn2": {
                "CSS": {
                    "margin-top": "1em",
                    "text-align": "center",
                    "width": "100%"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isEnables": "1"
                }
            },
            "coinbtn2text": {
                "CSS": {
                    "-moz-border-radius": "0.4em",
                    "-moz-box-sizing": "border-box",
                    "-webkit-border-radius": "0.4em",
                    "-webkit-box-sizing": "border-box",
                    "background": "#ff7d55",
                    "border": "0.2em solid #fff",
                    "border-radius": "0.4em",
                    "box-sizing": "border-box",
                    "color": "#222",
                    "display": "inline-block",
                    "font-size": "0.875em",
                    "height": "3.5em",
                    "line-height": "3.3em",
                    "text-align": "center",
                    "width": "45%"
                },
                "JS": {
                    "text": "企业签到送金币"
                }
            },
            "coinholder": {
                "CSS": {
                    "-moz-animation-direction": "normal, normal",
                    "-moz-animation-iteration-count": "1",
                    "-moz-animation-timing-function": "linear, ease-in",
                    "-webkit-animation-direction": "normal, normal",
                    "-webkit-animation-iteration-count": "1",
                    "-webkit-animation-timing-function": "linear, ease-in",
                    "background-color": "transparent",
                    "background-image": "url('" + top.tlbs.templatePath + "/images/gold.png')",
                    "background-position": "0 0",
                    "background-repeat": "no-repeat",
                    "background-size": "100% 100%",
                    "height": "67px",
                    "position": "absolute",
                    "text-align": "center",
                    "top": "-100px",
                    "width": "67px",
                    "z-index": "2047483647"
                }
            },
            "coinholderspan": {
                "CSS": {
                    "-moz-animation-direction": "alternate",
                    "-moz-animation-iteration-count": "1",
                    "-moz-animation-timing-function": "ease-in-out",
                    "-moz-transform-origin": "50%-100%",
                    "-webkit-animation-direction": "alternate",
                    "-webkit-animation-iteration-count": "1",
                    "-webkit-animation-timing-function": "ease-in-out",
                    "-webkit-transform-origin": "50%-100%",
                    "display": "block",
                    "position": "absolute"
                }
            },
            "goldcoinAnimationTime": "2000",
            "goldcoinToAnimate": "100",
            "moneyListDisplay": false,
            "noticelink": {
                "CSS": {
                    "color": "rgb(252, 209, 22)",
                    "display": "inline-block",
                    "font-size": "0.8em",
                    "text-decoration": "underline"
                },
                "JS": {
                    "text": "查看规则"
                }
            },
            "noticetext": {
                "CSS": {
                    "color": "rgb(255,255,255)",
                    "display": "inline-block",
                    "font-size": "0.8em"
                },
                "JS": {
                    "text": "签到送金币，连续签到最高可得9个金币"
                }
            },
            "noticetextholder": {
                "CSS": {
                    "display": "none",
                    "margin-left": "5%",
                    "position": "relative",
                    "text-align": "center",
                    "top": "1.5em",
                    "width": "90%"
                }
            },
            "status": {
                "JS": {
                    "datamapping": "respparam.status",
                    "status": "0",
                    "status0": "2015521",
                    "status1": "2015522",
                    "status2": "2015523",
                    "status3": "2015524"
                }
            },
            "tipholder": {
                "CSS": {
                    "-moz-border-radius": "4em",
                    "-moz-box-sizing": "border-box",
                    "-webkit-border-radius": "4em",
                    "-webkit-box-sizing": "border-box",
                    "background": "rgba(0,0,0,0.5)",
                    "border-radius": "4em",
                    "bottom": "9em",
                    "box-sizing": "border-box",
                    "display": "none",
                    "height": "4em",
                    "left": "50%",
                    "margin-left": "-35%",
                    "padding": "0.8em 1.5em",
                    "position": "absolute",
                    "text-align": "center",
                    "width": "70%",
                    "z-index": "2047483648"
                },
                "JS": {
                    "timeout": "3"
                }
            },
            "tiptext": {
                "CSS": {
                    "color": "#fff",
                    "font-size": "0.875em"
                },
                "JS": {
                    "coinsAdded": "0",
                    "datamapping": "respparam.vaIncreased",
                    "text": "今日签到成功，获得{1}个金币,明日连续签到+{2}金币",
                    "text1": "不好意思，刚刚没签上，麻烦您再签一次",
                    "text2": "不好意思，您已经签过到了，明天再来吧~",
                    "text3": "我也是醉了，系统出小差了."
                }
            }
        }
    },
    "gcmainholder": {
        "CSS": {
            "height": "100%",
            "width": "100%"
        },
        "JS": {}
    },
    "goldcointitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "赚流量"
                }
            }
        }
    },
    "gcapplink": {
        "CSS": {
            "position": "absolute",
            "box-shadow": " 0px -3px 3px RGBA(0,0,0,.1)",
            "height": "5em",
            "width": "100%",
            "background": "#f8f8f8",
            "-webkit-box-shadow": " 0px -3px 3px RGBA(0,0,0,.1)",
            "bottom": "0",
            "left": "0",
            "z-index": "2047483647",
            "moz-box-shadow": " 0px -3px 3px RGBA(0,0,0,.1)"
        },
        "JS": {
            "appdesc": {
                "CSS": {
                    "font-size": "0.8em",
                    "margin": "0px",
                    "padding": "0px",
                    "text-align": "left"
                }
            },
            "appdown": {
                "JS": {
                    "appdesc": {
                        "JS": {
                            "text": "下应用"
                        }
                    },
                    "appname": {
                        "JS": {
                            "text": "下载送金币"
                        }
                    },
                    "iconholder": {
                        "CSS": {
                            "-moz-background-size": "3.75em 3.75em",
                            "-o-background-size": "3.75em 3.75em",
                            "-webkit-background-size": "3.75em 3.75em",
                            "background-image": "url('" + top.tlbs.templatePath + "/images/ying.png')",
                            "background-position": "18% 40%",
                            "background-repeat": "no-repeat",
                            "background-size": "3.75em 3.75em",
                            "color": "#73d7bd",
                            "height": "3.75em",
                            "line-height": "1.25em",
                            "list-style": "none",
                            "margin": "0 auto",
                            "padding": "0.7em 0 0.7em 0em",
                            "text-align": "center"
                        }
                    },
                    "id": "appdown",
                    "innerholder": {
                        "CSS": {
                            "border-right": "1px dashed #ccc",
                            "float": "left",
                            "width": "49%"
                        }
                    },
                    "mainholder": {
                        "JS": {
                            "cdrConfig": {
                                "uitracingcdr": {
                                    "cdrType": "uitracingcdr",
                                    "enable": true,
                                    "storeData": false
                                }
                            }
                        }
                    },
                    "show": true
                }
            },
            "applink": {
                "JS": {
                    "appdesc": {
                        "JS": {
                            "text": "猜品牌"
                        }
                    },
                    "appname": {
                        "JS": {
                            "text": "猜对送金币"
                        }
                    },
                    "iconholder": {
                        "CSS": {
                            "-moz-background-size": "3.75em 3.75em",
                            "-o-background-size": "3.75em 3.75em",
                            "-webkit-background-size": "3.75em 3.75em",
                            "background-image": "url('" + top.tlbs.templatePath + "/images/cai.png')",
                            "background-position": "18% 40%",
                            "background-repeat": "no-repeat",
                            "background-size": "3.75em 3.75em",
                            "color": "#f17049",
                            "height": "3.75em",
                            "line-height": "1.25em",
                            "list-style": "none",
                            "margin": "0 auto",
                            "padding": "0.7em 0 0.7em 0em",
                            "text-align": "center"
                        }
                    },
                    "id": "applink",
                    "innerholder": {
                        "CSS": {
                            "float": "left",
                            "width": "50%"
                        }
                    },
                    "mainholder": {
                        "JS": {
                            "cdrConfig": {
                                "uitracingcdr": {
                                    "cdrType": "uitracingcdr",
                                    "enable": true,
                                    "storeData": false
                                }
                            }
                        }
                    },
                    "show": true
                }
            },
            "appname": {
                "CSS": {
                    "font-size": "0.93em",
                    "font-weight": "bold",
                    "margin": "0px",
                    "padding-top": "0.75em",
                    "text-align": "left"
                }
            },
            "text": {
                "JS": {
                    "index": "0",
                    "len": "2",
                    "text0": "appdown",
                    "text1": "applink"
                }
            }
        }
    }
};
window.page_PropertyMap["iactivity_propertyTable"] = {
    "activity": {
        "CSS": {},
        "JS": {
            "c60_fbar_link_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_link_click": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "statusconfig": {
                "status": {
                    "btntxt": "去首页看看",
                    "imgUrl": "'" + top.tlbs.templatePath + "/images/gongchengshi.jpg'",
                    "tipstxt": "攻程狮正在奋力开采中，敬请期待!"
                }
            }
        }
    },
    "activitytitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "天天惠"
                }
            }
        }
    }
};
window.page_PropertyMap["iappdownload_propertyTable"] = {
    "appdownload": {
        "CSS": {},
        "JS": {
            "appdownload": {
                "CSS": {
                    "padding-top": "8.4em"
                }
            },
            "c60_fbar_app_result_con": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "showconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    },
                    "statusconfig": {
                        "status": "3",
                        "status1": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/404.jpg'",
                            "tipstxt": "不要阻止我，我要去天台思考人生"
                        },
                        "status2": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/gongchengshi.jpg'",
                            "tipstxt": "攻程狮正在奋力开采中，敬请期待!"
                        },
                        "status3": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                            "tipstxt": "我也是醉了，系统出小差了"
                        }
                    }
                }
            },
            "c60_fbar_dald_li": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_dalt_colorline_green": {
                "background": "#73d7bd"
            },
            "c60_fbar_dalt_colorline_orange": {
                "background": "#ff7043"
            },
            "c60_fbar_dalt_green_txt": {
                "color": "#73d7bd"
            },
            "c60_fbar_dalt_link": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_dalt_orange_txt": {
                "color": "#ff7043"
            },
            "c60_fbar_link_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "more": {
                "CSS": {
                    "hide": {
                        "display": "none"
                    },
                    "isShow": false,
                    "show": {
                        "display": "block"
                    }
                },
                "JS": {
                    "link": {
                        "url0": "http://www.baidu.com/search/?c={auth}&jsessionid={jsessionid}",
                        "url1": "http://www.sina.com/search/?c={auth}&jsessionid={jsessionid}"
                    },
                    "linktype": {
                        "defaultstatus": "0",
                        "status0": "0",
                        "status1": "0"
                    },
                    "text": "MORE"
                }
            }
        }
    },
    "iapptitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "玩游戏"
                }
            }
        }
    },
    "iappsearch": {
        "CSS": {
            "display": "none"
        },
        "JS": {
            "c60_fbar_search_submit": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "searchurl": {
                "iframeurl": "http://www.sina.com.cn?c={searchkeys}&jsessionid={jsessionid}"
            }
        }
    },
    "imagelistapp": {
        "CSS": {},
        "JS": {
            "adposid": "1",
            "c60_fbar_link_click": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            }
        }
    }
};
window.page_PropertyMap["iframepage_propertyTable"] = {
    "iframeholder": {
        "CSS": {
            "position": "relative",
            "height": "100%",
            "width": "100%"
        },
        "JS": {
            "animation": false,
            "clickable": false,
            "iframecfg": {
                "CSS": {
                    "border": "0",
                    "height": "100%",
                    "left": "0",
                    "position": "absolute",
                    "top": "0",
                    "width": "100%"
                },
                "JS": {
                    "preload": true
                }
            },
            "stateconfig": {
                "state": "0"
            }
        }
    },
    "ifpholder": {
        "CSS": {
            "height": "95%",
            "width": "100%",
            "background": "#ffffff"
        },
        "JS": {}
    },
    "ifpmainholder": {
        "CSS": {
            "height": "100%",
            "width": "100%"
        },
        "JS": {}
    },
    "ifptitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "应用"
                }
            }
        }
    }
};
window.page_PropertyMap["ifscoupon_propertyTable"] = {
    "ifscoupontitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "我的特权"
                }
            }
        }
    },
    "ifscouponcomp": {
        "CSS": {
            "position": "relative",
            "height": "100%",
            "width": "100%"
        },
        "JS": {
            "animation": false,
            "clickable": false,
            "couponCodeText": {
                "CSS": {
                    "background": "left center no-repeat",
                    "background-image": "url('" + top.tlbs.templatePath + "/images/my_privilege_ico_01.png')",
                    "background-size": "1.2em 1.2em",
                    "color": "#222",
                    "float": "left",
                    "font-size": "0.8em",
                    "line-height": "1.8em",
                    "padding-left": "1.5em",
                    "width": "5em"
                },
                "JS": {
                    "text": "兑换码:"
                }
            },
            "couponCodeValue": {
                "CSS": {
                    "color": "#222",
                    "float": "left",
                    "font-size": "0.8em",
                    "line-height": "1.8em",
                    "width": "65%"
                }
            },
            "couponDesc": {
                "CSS": {
                    "color": "#ff7d55",
                    "font-size": "0.8em",
                    "margin-top": "0.6em",
                    "overflow": "hidden",
                    "text-overflow": "ellipsis",
                    "white-space": "nowrap",
                    "width": "90%"
                }
            },
            "couponExDescText": {
                "CSS": {
                    "background": "left center no-repeat",
                    "background-image": "url('" + top.tlbs.templatePath + "/images/my_privilege_ico_03.png')",
                    "background-size": "1.2em 1.2em",
                    "color": "#222",
                    "float": "left",
                    "font-size": "0.8em",
                    "line-height": "1.8em",
                    "padding-left": "1.5em",
                    "width": "5em"
                },
                "JS": {
                    "text": "使用方法:"
                }
            },
            "couponExDescValue": {
                "CSS": {
                    "color": "#222",
                    "float": "left",
                    "font-size": "0.8em",
                    "line-height": "1.8em",
                    "width": "65%"
                }
            },
            "couponIndex": {
                "CSS": {
                    "color": "#f9807c"
                }
            },
            "couponLink": {
                "CSS": {
                    "-moz-border-radius": "2.2em",
                    "-webkit-border-radius": "2.2em",
                    "background": "#ff7d55",
                    "border-radius": "2.2em",
                    "color": "#fff",
                    "float": "right",
                    "font-size": "1em",
                    "height": "2.2em",
                    "line-height": "2.2em",
                    "margin-right": "1.2em",
                    "text-align": "center",
                    "width": "4.5em"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "text": "详情"
                }
            },
            "couponName": {
                "CSS": {
                    "color": "#222",
                    "font-size": "1em",
                    "overflow": "hidden",
                    "text-overflow": "ellipsis",
                    "white-space": "nowrap",
                    "width": "90%"
                }
            },
            "couponValidDateText": {
                "CSS": {
                    "background": "left center no-repeat",
                    "background-image": "url('" + top.tlbs.templatePath + "/images/my_privilege_ico_02.png')",
                    "background-size": "1.2em 1.2em",
                    "color": "#222",
                    "float": "left",
                    "font-size": "0.8em",
                    "line-height": "1.8em",
                    "padding-left": "1.5em",
                    "width": "5em"
                },
                "JS": {
                    "text": "兑换日期:"
                }
            },
            "couponValidDateValue": {
                "CSS": {
                    "color": "#ff7d55",
                    "float": "left",
                    "font-size": "0.8em",
                    "line-height": "1.8em",
                    "width": "65%"
                }
            },
            "stateconfig": {
                "state": "0"
            },
            "topImgBanner": {
                "CSS": {
                    "height": "6em"
                },
                "JS": {
                    "bannerImgURL": "url('" + top.tlbs.templatePath + "/images/my_privilege_banner.png')"
                }
            }
        }
    },
    "ifscouponmainholder": {
        "CSS": {
            "height": "100%",
            "width": "100%"
        },
        "JS": {}
    },
    "ifscouponholder": {
        "CSS": {
            "height": "95%",
            "width": "100%",
            "background": "#ffffff"
        },
        "JS": {}
    }
};
window.page_PropertyMap["iguess_propertyTable"] = {
    "guess": {
        "CSS": {},
        "JS": {
            "bg_black_pop": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "bottom": "40%",
                            "display": "block"
                        },
                        "time": "4"
                    }
                }
            },
            "bg_pop_block": {
                "JS": {
                    "show": false,
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "display": "block"
                        }
                    }
                }
            },
            "c60_fbar_left_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "text": "继续猜"
                }
            },
            "c60_fbar_link_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_mark_banner": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_mark_banner_txt": {
                "JS": {
                    "text": "猜对该品牌即送"
                }
            },
            "c60_fbar_mark_banner_txt2": {
                "JS": {
                    "text": "枚金币~"
                }
            },
            "c60_fbar_right_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "text": "去官网"
                }
            },
            "c60_fbar_taocan_result_con": {
                "JS": {
                    "showconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "display": "block"
                        }
                    },
                    "state": {
                        "CSS": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/gongchengshi.jpg')"
                        },
                        "btntxt": "去首页看看",
                        "tipstxt": "攻程狮正在奋力开采中，敬请期待!"
                    }
                }
            },
            "c60_fbar_tou_look": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "text": "偷瞄一眼"
                }
            },
            "guess_mark_con": {
                "JS": {
                    "stateconfig": {
                        "state": "1",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "display": "block"
                        }
                    }
                }
            },
            "maxline": "4",
            "maxlist": "6",
            "tips0": {
                "isShow": true
            },
            "tips1": {
                "CSS": {
                    "color": "#007fcc"
                },
                "isShow": true
            },
            "tips2": {
                "isShow": true
            },
            "tips3": {
                "CSS": {
                    "color": "red"
                },
                "isShow": true
            },
            "tips4": {
                "isShow": true
            },
            "tipserror": {
                "tipstext0": "sorry，猜品牌失败。"
            },
            "tipsfail": {
                "tipstext0": "sorry，今天",
                "tipstext1": "金币已经被抢空了，明天再来吧~"
            },
            "tipsok": {
                "tipstext0": "恭喜您，猜对了。",
                "tipstext1": "送您",
                "tipstext2": "个金币,已存入您的账户。"
            },
            "tipstext1": "今天品牌已经猜完，明天再来哦！",
            "tipstext2": "还是猜不中么?点击图片可以偷瞄提示哦!",
            "wordclick": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            }
        }
    },
    "iguessit": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "猜品牌"
                }
            }
        }
    }
};
window.page_PropertyMap["iguesspeek_propertyTable"] = {
    "iguesspeekit": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "猜品牌"
                }
            }
        }
    },
    "guesspeek": {
        "CSS": {},
        "JS": {
            "c60_toolbar_aodi_close": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "text": "关闭提示"
                }
            },
            "c60_toolbar_aodi_img": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            }
        }
    }
};
window.page_PropertyMap["imine_propertyTable"] = {
    "minetitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "我的"
                }
            }
        }
    },
    "cmine": {
        "CSS": {},
        "JS": {
            "attend_btn_link": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-color": "#fff",
                            "color": "#73d7bd"
                        },
                        "state1": {
                            "background-color": "#cacecd",
                            "color": "#999"
                        }
                    }
                }
            },
            "bg_black_pop": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "bottom": "40%",
                            "display": "block"
                        },
                        "time": "2"
                    }
                }
            },
            "c60_fbar_arrow_jump_ico1": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/roright.png')"
                }
            },
            "c60_fbar_arrow_jump_ico2": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/roright.png')"
                }
            },
            "c60_fbar_arrow_jump_text1": {
                "JS": {
                    "isShow": true,
                    "text": "1金币可兑换1M流量"
                }
            },
            "c60_fbar_arrow_jump_text2": {
                "JS": {
                    "isShow": false
                }
            },
            "c60_fbar_attend_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true
                }
            },
            "c60_fbar_attend_btn_link": {
                "JS": {
                    "text1": "签到",
                    "text2": "已签"
                }
            },
            "c60_fbar_c60_fbar_moblie": {
                "JS": {
                    "isShow": true
                }
            },
            "c60_fbar_coin_txt_bold": {
                "JS": {
                    "isShow": true
                }
            },
            "c60_fbar_my_add_desktop": {
                "CSS": {
                    "background": "#73d7bd",
                    "color": "#fff",
                    "font-size": "1em",
                    "height": "2.4em",
                    "margin-top": "1.5em",
                    "text-align": "center",
                    "width": "65%"
                },
                "JS": {
                    "androidurl": "http://www.google.com",
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "iosurl": "http://www.apple.com",
                    "isShow": false,
                    "linktype": "0"
                }
            },
            "c60_fbar_my_add_desktop_text": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/zuomian.png')",
                    "background-size": "1.2em 1.2em",
                    "color": "#fff",
                    "font-size": "1em",
                    "height": "1.5em",
                    "line-height": "1.5em",
                    "margin-top": ".5em",
                    "padding-left": "1.5em"
                },
                "JS": {
                    "text": "添加上网助手到桌面"
                }
            },
            "c60_fbar_my_coin": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/wodejinbi.png')"
                },
                "JS": {
                    "text": "我的金币"
                }
            },
            "c60_fbar_my_con": {
                "JS": {
                    "isShow": true
                }
            },
            "c60_fbar_my_list_coin": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true
                }
            },
            "c60_fbar_my_list_privilege": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": false,
                    "redPointShow": true
                }
            },
            "c60_fbar_my_list_set": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true
                }
            },
            "c60_fbar_mybg_green": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/mybg_green.png')"
                },
                "JS": {
                    "isShow": true
                }
            },
            "c60_fbar_privilege": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/wodetequan.png')"
                },
                "JS": {
                    "text": "我的特权"
                }
            },
            "c60_fbar_rules_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": false
                }
            },
            "c60_fbar_rules_btn_link": {
                "CSS": {
                    "background-color": "#73d7bd",
                    "background-image": "url('" + top.tlbs.templatePath + "/images/rule.png')",
                    "background-size": "35%",
                    "color": "#0d7164",
                    "font-size": "0.8em",
                    "margin-right": "0.5em",
                    "margin-top": "1em",
                    "padding-left": "1.2em"
                },
                "JS": {
                    "text": "规则"
                }
            },
            "c60_fbar_set": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/wodeshezhi.png')"
                },
                "JS": {
                    "text": "设置"
                }
            },
            "tips1": "您正在签到，请稍等...",
            "tips2": "恭喜您签到成功 ，赠送",
            "tips3": "金币！",
            "tips4": "对不起，您的余额不足，签到失败!",
            "tips5": "对不起，您本次签到失败!"
        }
    }
};
window.page_PropertyMap["iminecoin_propertyTable"] = {
    "minecointitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "我的金币"
                }
            }
        }
    },
    "cminecoin": {
        "CSS": {},
        "JS": {
            "bg_black_pop": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "bottom": "40%",
                            "display": "block"
                        },
                        "time": "4"
                    }
                }
            },
            "c60_fbar_c60_toolbar_loading_more": {
                "JS": {
                    "text": "查看更多"
                }
            },
            "c60_fbar_coin_detail": {
                "JS": {
                    "text": "累计消耗："
                }
            },
            "c60_fbar_coin_type": {
                "JS": {
                    "text": "金币："
                }
            },
            "c60_fbar_exchange_btn_link": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "兑换流量"
                }
            },
            "c60_fbar_exchange_flux_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true
                }
            },
            "c60_fbar_exchange_flux_btn_link": {
                "JS": {
                    "text": "马上兑换"
                }
            },
            "c60_fbar_minecoin": {
                "CSS": {
                    "background-color": "#fff",
                    "height": "100%",
                    "left": "0",
                    "padding-bottom": "1.5em",
                    "position": "absolute",
                    "top": "2.4em",
                    "width": "100%",
                    "z-index": "2047483647"
                }
            },
            "c60_fbar_mobile": {
                "JS": {
                    "text": "手机号码："
                }
            },
            "c60_fbar_mobile_transfer": {
                "JS": {
                    "errortext": "请输入正确手机号码",
                    "hinttext": "请输入手机号码",
                    "text": "手机号码："
                }
            },
            "c60_fbar_mobile_txt_gray": {
                "JS": {
                    "text": "（仅支持本机兑换） "
                }
            },
            "c60_fbar_mycoin_tab": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true
                }
            },
            "c60_fbar_mycoin_tab0": {
                "JS": {
                    "text": "金币明细"
                }
            },
            "c60_fbar_mycoin_tab1": {
                "JS": {
                    "text": "兑换历史"
                }
            },
            "c60_fbar_tit1": {
                "JS": {
                    "text": "请填写兑换信息"
                }
            },
            "c60_fbar_tit1_transfer": {
                "JS": {
                    "text": "请填写赠送信息"
                }
            },
            "c60_fbar_transfer_btn_link": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": false,
                    "text": "赠送流量"
                }
            },
            "c60_fbar_transfer_flux_btn_link": {
                "JS": {
                    "text": "马上赠送"
                }
            },
            "c60_fbar_type_exchange": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "兑换种类："
                }
            },
            "c60_fbar_type_transfer": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "errortext": "请输入正确的兑换数量",
                    "hinttext": "请输入兑换数量",
                    "isShow": true,
                    "text": "赠送数量："
                }
            },
            "c60_toolbar_loading_more": {
                "CSS": {
                    "color": "#ff7043",
                    "display": "block",
                    "font-size": "0.875em",
                    "padding": "0.8em 0 2em",
                    "text-align": "center",
                    "width": "100%"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true
                }
            },
            "detail": {
                "index": "0",
                "money_detail0": {
                    "head0": "时间",
                    "head1": "来源",
                    "head2": "数量",
                    "len": "3",
                    "number": "10",
                    "totalget": "10"
                },
                "money_detail1": {
                    "head0": "时间",
                    "head1": "兑换产品",
                    "head2": "消耗金币",
                    "len": "3",
                    "number": "10",
                    "totalget": "10"
                },
                "number": "10",
                "start": "1",
                "state0": {
                    "border-bottom": "1px solid #ebebeb",
                    "color": "#222"
                },
                "state1": {
                    "border-bottom": "3px solid #ff7043",
                    "color": "#ff7043"
                },
                "step": "10",
                "totalget": "0"
            },
            "exchange_btn": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-color": "#fff",
                            "border": "1px solid #73d7bd",
                            "color": "#73d7bd"
                        },
                        "state1": {
                            "background-color": "#73d7bd",
                            "border": "1px solid #fff",
                            "color": "#fff"
                        }
                    }
                }
            },
            "exchange_flux_btn_link": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "stateconfig": {
                        "index": "0",
                        "state": "0",
                        "state0": {
                            "background-color": "#73d7bd"
                        },
                        "state1": {
                            "background-color": "#cacecd"
                        }
                    }
                }
            },
            "exchange_flux_con": {
                "JS": {
                    "respons": {
                        "1-140-1-000": "余额不足兑换",
                        "1-140-1-001": "兑换失败，请重试",
                        "1-140-1-007": "查询商品不存在",
                        "1-140-1-008": "校验手机号码失败，号段不被支持",
                        "1-FFF-0-000": "兑换成功",
                        "1-FFF-1-000": "服务器忙",
                        "defaultErrorCode": "1-FFF-1-000",
                        "defaultSuccessCode": "1-FFF-0-000"
                    },
                    "stateconfig": {
                        "index": "0",
                        "state": "0",
                        "state0": {
                            "border": "1px solid #d8d8d8"
                        },
                        "state1": {
                            "border": "1px solid #ff7d55"
                        }
                    }
                }
            },
            "maxtype": "4",
            "tips1": "流量, 消耗",
            "tips2": "个金币",
            "tit_txt_gray": {
                "JS": {
                    "isShow": true,
                    "text": "（1金币可兑换1M流量,有效期6个月）"
                }
            },
            "transfer_btn": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-color": "#fff",
                            "border": "1px solid #73d7bd",
                            "color": "#73d7bd"
                        },
                        "state1": {
                            "background-color": "#73d7bd",
                            "border": "1px solid #fff",
                            "color": "#fff"
                        }
                    }
                }
            },
            "transfer_flux_btn_link": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "stateconfig": {
                        "index": "0",
                        "state": "0",
                        "state0": {
                            "background-color": "#73d7bd"
                        },
                        "state1": {
                            "background-color": "#cacecd"
                        }
                    }
                }
            },
            "transfer_flux_con": {
                "JS": {
                    "respons": {
                        "defaultSuccessCode": "TRANS000",
                        "errorMessage": "不好意思,没有赠送成功。可以重新赠送",
                        "successMessage": "恭喜你，赠送成功！"
                    },
                    "stateconfig": {
                        "index": "0",
                        "state": "0",
                        "state0": {
                            "border": "1px solid #d8d8d8"
                        },
                        "state1": {
                            "border": "1px solid #ff7d55"
                        }
                    }
                }
            },
            "transfer_txt_gray": {
                "JS": {
                    "isShow": true
                }
            }
        }
    }
};
window.page_PropertyMap["imineset_propertyTable"] = {
    "cmineset": {
        "CSS": {},
        "JS": {
            "avetraffic_chose": {
                "JS": {
                    "index": "0",
                    "len": "10",
                    "text0": "0",
                    "text1": "5",
                    "text2": "10",
                    "text3": "15",
                    "text4": "20",
                    "text5": "25",
                    "text6": "30",
                    "text7": "35",
                    "text8": "40",
                    "text9": "50"
                }
            },
            "bg_black_pop": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "bottom": "40%",
                            "display": "block"
                        },
                        "time": "4"
                    }
                }
            },
            "bg_pop_block": {
                "JS": {
                    "stateconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    }
                }
            },
            "c60_fbar_about": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/guanyu.png')"
                },
                "JS": {
                    "text": "关于"
                }
            },
            "c60_fbar_avetraffic_chose_txt": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_consumetraffic_chose_txt": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_feedback": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/fankui.png')"
                },
                "JS": {
                    "text": "反馈"
                }
            },
            "c60_fbar_feedback_chose_txt": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true
                }
            },
            "c60_fbar_feedback_tit": {
                "JS": {
                    "text": "本期反馈"
                }
            },
            "c60_fbar_gexinghua": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/gexinghua.png')"
                },
                "JS": {
                    "isShow": false,
                    "text": "个性化设置"
                }
            },
            "c60_fbar_guanbi_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true
                }
            },
            "c60_fbar_left_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "不了，谢谢"
                }
            },
            "c60_fbar_returnback": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_right_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "是的，确认"
                }
            },
            "c60_fbar_set_close": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/guanbi.png')"
                },
                "JS": {
                    "text": "关闭"
                }
            },
            "c60_fbar_tijiao_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-color": "#73d7bd",
                            "color": "#fff"
                        },
                        "state1": {
                            "background-color": "#cacecd",
                            "color": "#999"
                        }
                    },
                    "text": "提交"
                }
            },
            "c60_fbar_touchslide_down": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_touchslide_up": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_tuiding": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "退订"
                }
            },
            "c60_fbar_txt1": {
                "JS": {
                    "text": "确认要"
                }
            },
            "c60_fbar_txt2": {
                "CSS": {
                    "color": "#73d7bd"
                },
                "JS": {}
            },
            "c60_fbar_txt3": {
                "CSS": {
                    "margin-top": "0.4em"
                },
                "JS": {
                    "text": "关闭了"
                }
            },
            "c60_fbar_txt4": {
                "JS": {
                    "text": "看不到我哦。"
                }
            },
            "c60_fbar_txt5": {
                "JS": {
                    "text": "["
                }
            },
            "c60_fbar_txt6": {
                "JS": {
                    "text": "]"
                }
            },
            "close_list_detail": {
                "JS": {
                    "curIndex": "0",
                    "len": "3",
                    "stateconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    },
                    "text0": {
                        "desc": "当天关闭，明天继续体验",
                        "info": "本日",
                        "isShow": true,
                        "type": "本日关闭"
                    },
                    "text1": {
                        "desc": "本周关闭，下周一开始继续体验",
                        "info": "本周",
                        "isShow": true,
                        "type": "本周关闭"
                    },
                    "text2": {
                        "desc": "本月关闭，下月1号开始继续体验",
                        "info": "本月",
                        "isShow": true,
                        "type": "本月关闭"
                    }
                }
            },
            "consumetraffic_chose": {
                "JS": {
                    "index": "0",
                    "len": "10",
                    "text0": "50",
                    "text1": "55",
                    "text2": "60",
                    "text3": "65",
                    "text4": "70",
                    "text5": "75",
                    "text6": "80",
                    "text7": "85",
                    "text8": "90",
                    "text9": "95"
                }
            },
            "feedback_chose": {
                "JS": {
                    "index": "0",
                    "len": "7",
                    "stateconfig": {
                        "status": "0",
                        "status1": {
                            "background": "#b9ebde",
                            "border": "1px solid #73d7bd"
                        }
                    },
                    "text0": "新版焕然一新",
                    "text1": "我是2G,很卡",
                    "text2": "我是3G,有些卡",
                    "text3": "我是4G,速度不错",
                    "text4": "点半天没反应",
                    "text5": "找不到我想订购的套餐",
                    "text6": "还有哪里不爽请点我"
                }
            },
            "feedback_zone": {
                "JS": {
                    "stateconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    },
                    "text": "吐苦水口水区~",
                    "tips1": "提交内容不能为空",
                    "tips2": "提交内容不能为原始内容哦"
                }
            },
            "my_con": {
                "CSS": {
                    "background": "#ebebeb",
                    "height": "100%",
                    "left": "0",
                    "padding-bottom": "1.5em",
                    "position": "absolute",
                    "top": "2.4em",
                    "width": "100%"
                },
                "JS": {
                    "stateconfig": {
                        "status": "0",
                        "status1": {
                            "background": "#b9ebde",
                            "border": "1px solid #73d7bd"
                        }
                    }
                }
            },
            "mytitle": {
                "CSS": {
                    "float": "left"
                }
            },
            "native": {
                "JS": {
                    "icon": {
                        "stateconfig": {
                            "state": "0",
                            "state0": {
                                "background-image": "url('" + top.tlbs.templatePath + "/images/todown.png')"
                            },
                            "state1": {
                                "background-image": "url('" + top.tlbs.templatePath + "/images/toup.png')"
                            }
                        }
                    },
                    "index": "-1",
                    "last": "0",
                    "option": {
                        "stateconfig": {
                            "state": "0",
                            "state0": {
                                "display": "none"
                            },
                            "state1": {
                                "display": "block"
                            }
                        }
                    }
                }
            },
            "pop_block": {
                "JS": {
                    "stateconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    }
                }
            },
            "textconfig": {
                "text10": "信息",
                "text11": "等功能，并将不断丰富",
                "text12": "不会产生任何费用，流量助手产生的流量费也会进行",
                "text13": "减免",
                "text14": "(注意：从流量助手跳转出去的页面产生的流量不减免)",
                "text15": "'零干扰'，可以自行收缩到屏幕右下角，不影响用户正常浏览网页，用户也可自主选择当天关闭服务",
                "text16": "服务开通与退订都可拨打",
                "text17": "移动热线10086",
                "text18": "进行办理",
                "text2": "中国移动推出的手机上网增强服务，本服务具有以下点：",
                "text3": "具有",
                "text4": "流量查询",
                "text5": "（数据更官方权威）、流量",
                "text6": "提醒",
                "text7": "、流量包",
                "text8": "办理",
                "text9": "、最新优惠"
            },
            "tips": {
                "submittextFail": "意见反馈提交失败",
                "submittextSuccess": "意见反馈提交成功"
            }
        }
    },
    "minesettitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "我的"
                }
            }
        }
    }
};
window.page_PropertyMap["iminetui_propertyTable"] = {
    "minetuititle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "退订"
                }
            }
        }
    },
    "cminetui": {
        "CSS": {},
        "JS": {
            "bg_black_pop": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "bottom": "40%",
                            "display": "block"
                        },
                        "time": "3"
                    }
                }
            },
            "c60_fbar_sug_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-color": "#73d7bd",
                            "color": "#fff"
                        },
                        "state1": {
                            "background-color": "#cacecd",
                            "color": "#999"
                        }
                    },
                    "text": "再见了",
                    "time": "4"
                }
            },
            "c60_fbar_sug_textarea": {
                "JS": {
                    "text": "请告诉我不能忍受我的原因吧，我会好好改正的~",
                    "tips1": "提交内容不能为空",
                    "tips2": "提交内容不能为原始内容哦",
                    "tips3": "意见反馈提交成功"
                }
            },
            "c60_fbar_tuiding_tips": {
                "JS": {
                    "text": "麻烦您填写退订原因后才可以退订，方便我们不断改进。"
                }
            },
            "my_con": {
                "CSS": {
                    "-moz-box-sizing": "border-box",
                    "-webkit-box-sizing": "border-box",
                    "background": "#ebebeb",
                    "box-sizing": "border-box",
                    "height": "100%",
                    "left": "0",
                    "min-height": "10em",
                    "padding-bottom": "1.5em",
                    "padding-top": "2.4em",
                    "position": "absolute",
                    "top": "0",
                    "width": "100%"
                }
            }
        }
    }
};
window.page_PropertyMap["imsgbox_propertyTable"] = {
    "msgbox": {
        "CSS": {},
        "JS": {
            "bg_black_pop": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "display": "none"
                        },
                        "state1": {
                            "bottom": "40%",
                            "display": "block"
                        },
                        "time": "4"
                    }
                }
            },
            "bg_pop_block": {
                "JS": {
                    "stateconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    }
                }
            },
            "c60_fbar_left_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "取消"
                }
            },
            "c60_fbar_nc_tabtit": {
                "JS": {
                    "index": "0",
                    "stateconfig": {
                        "state0": {
                            "border-bottom": "4px solid #ff7043",
                            "color": "#ff7043"
                        },
                        "state1": {
                            "border-bottom": "1px solid #d6d6d6",
                            "color": "#222"
                        }
                    },
                    "text0": "通知消息",
                    "text1": "业务消息"
                }
            },
            "c60_fbar_nc_tabtit0": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_nc_tabtit0span": {
                "JS": {
                    "show": true,
                    "text0": " ( ",
                    "text1": " ) "
                }
            },
            "c60_fbar_nc_tabtit1": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_nc_tabtit1span": {
                "JS": {
                    "show": true,
                    "text0": "（",
                    "text1": "）"
                }
            },
            "c60_fbar_ncc_lb_ico": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/news_center_chose_gray.png')"
                        },
                        "state1": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/news_center_chose_green.png')"
                        }
                    }
                }
            },
            "c60_fbar_ncc_lb_ico_gray_all": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/news_center_chose_gray.png')"
                        },
                        "state1": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/news_center_chose_green.png')"
                        }
                    }
                }
            },
            "c60_fbar_ncc_list": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "listconfig": {
                        "curIndex": "0",
                        "startNum": "1",
                        "state0": {
                            "display": "block"
                        },
                        "state1": {
                            "display": "none"
                        },
                        "step": "10"
                    },
                    "show": false,
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-color": "#fff"
                        },
                        "state1": {
                            "background-color": "#f5f5f5"
                        }
                    }
                }
            },
            "c60_fbar_ncc_list1": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "listconfig": {
                        "curIndex": "0",
                        "startNum": "1",
                        "state0": {
                            "display": "block"
                        },
                        "state1": {
                            "display": "none"
                        },
                        "step": "10"
                    },
                    "show": false,
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-color": "#fff"
                        },
                        "state1": {
                            "background-color": "#f5f5f5"
                        }
                    }
                }
            },
            "c60_fbar_ncc_lt_looktxt": {
                "JS": {
                    "text": "点击查看"
                }
            },
            "c60_fbar_ncc_more0": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "text": "查看更多"
                }
            },
            "c60_fbar_ncc_more1": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "text": "查看更多"
                }
            },
            "c60_fbar_ncc_nomore0": {
                "JS": {
                    "show": false,
                    "text": "no more..."
                }
            },
            "c60_fbar_ncc_nomore1": {
                "JS": {
                    "show": false,
                    "text": "no more..."
                }
            },
            "c60_fbar_news_center_del": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "show": false,
                    "stateconfig": {
                        "state": "1",
                        "state0": {
                            "background-color": "#f03333",
                            "color": "#fff"
                        },
                        "state1": {
                            "background-color": "#cacecd",
                            "color": "#fff"
                        }
                    },
                    "text": "删除"
                }
            },
            "c60_fbar_news_center_df": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "textconfig": {
                        "index": "0",
                        "text0": "删除",
                        "text1": "完成"
                    }
                }
            },
            "c60_fbar_pop_block_text": {
                "JS": {
                    "text1": "，您好",
                    "text2": "确认删除选中的消息",
                    "text3": "删除后不可恢复"
                }
            },
            "c60_fbar_right_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "确认",
                    "text2": "消息删除成功",
                    "text3": "消息删除失败"
                }
            },
            "pop_block": {
                "JS": {
                    "stateconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    }
                }
            },
            "titleType": {
                "JS": {
                    "0X501000": "批开提醒",
                    "0X502000": "套餐推荐",
                    "0X503000": "流量提醒",
                    "0X505000": "资讯活动",
                    "0X507000": "主套餐提醒",
                    "0X508000": "外部消息",
                    "0X512000": "应用下载提醒",
                    "0X900001": "订购消息",
                    "0X900002": "签到受赠消息",
                    "0X900003": "兑换消息",
                    "0X900004": "用户反馈",
                    "0X900005": "企业签到受赠消息",
                    "0X900006": "猜品牌消息",
                    "0X900007": "新应用消息"
                }
            }
        }
    },
    "msgboxtitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "消息中心"
                }
            }
        }
    }
};
window.page_PropertyMap["imy_propertyTable"] = {
    "cmy": {
        "CSS": {},
        "JS": {
            "c60_fbar_arrow_jump_ico": {
                "JS": {
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/roright.png')"
                        },
                        "state1": {
                            "background-image": "url('" + top.tlbs.templatePath + "/images/todown.png')"
                        }
                    }
                }
            },
            "c60_fbar_attend_btn_link": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "stateconfig": {
                        "state": "0",
                        "state0": {
                            "background-color": "#fff",
                            "border": "1px solid #73d7bd",
                            "color": "#73d7bd"
                        },
                        "state1": {
                            "background-color": "#73d7bd",
                            "border": "1px solid #fff",
                            "color": "#fff"
                        }
                    },
                    "text0": "签到",
                    "text1": "已签"
                }
            },
            "c60_fbar_mine_result": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/zuile.jpg')"
                },
                "JS": {
                    "isShow": true,
                    "title": "我也是醉了，系统出小差了!"
                }
            },
            "c60_fbar_mine_tips": {
                "CSS": {
                    "-moz-border-radius": "4em",
                    "-moz-box-sizing": "border-box",
                    "-webkit-border-radius": "4em",
                    "-webkit-box-sizing": "border-box",
                    "background": "rgba(0,0,0,0.5)",
                    "border-radius": "4em",
                    "bottom": "9em",
                    "box-sizing": "border-box",
                    "display": "none",
                    "left": "50%",
                    "margin-left": "-35%",
                    "padding": "0.8em 1.5em",
                    "position": "absolute",
                    "text-align": "center",
                    "width": "70%",
                    "z-index": "2047483648"
                },
                "JS": {
                    "closetime": "1000"
                }
            },
            "c60_fbar_mine_tipstext": {
                "CSS": {
                    "color": "rgb(255, 255, 255)",
                    "font-size": "0.875em"
                },
                "JS": {
                    "waitmessage": "正在处理中哦,请稍等..."
                }
            },
            "c60_fbar_my_add_desktop": {
                "CSS": {
                    "background": "#73d7bd",
                    "color": "#fff",
                    "font-size": "1em",
                    "height": "2.4em",
                    "text-align": "center",
                    "width": "65%"
                },
                "JS": {
                    "androidurl": "http://www.google.com",
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "iosurl": "http://www.apple.com",
                    "isShow": true,
                    "linktype": "0"
                }
            },
            "c60_fbar_my_add_desktop_text": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/zuomian.png')",
                    "background-size": "1.2em 1.2em",
                    "color": "#fff",
                    "font-size": "1em",
                    "height": "1.5em",
                    "line-height": "1.5em",
                    "margin-top": ".5em",
                    "padding-left": "1.5em"
                },
                "JS": {
                    "text": "添加上网助手到桌面"
                }
            },
            "c60_fbar_my_flowcurrency": {
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": true,
                            "text": "兑换流量币"
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "流量币",
                    "unit": "个",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_head_attend_tips": {
                "JS": {
                    "resultmessage": {
                        "failuremessage1": "亲，您今天已经签过了哟!",
                        "failuremessage2": "对不起，您本次签到失败<br/>请重新再签!",
                        "successmessage": "亲，签到成功了哟!",
                        "successmessagebegin": "亲，本次签到获得",
                        "successmessageend": "连续签到奖励更多哦!",
                        "waitmessage": "正在签到，请稍等哟，亲!"
                    },
                    "title": "签到有礼",
                    "unit": "沃豆"
                }
            },
            "c60_fbar_my_head_attend_tips_textbtn": {
                "CSS": {
                    "background": "#fff",
                    "border": "1px solid #ff7043",
                    "color": "#ff7043",
                    "font-size": "1em",
                    "height": "2em",
                    "line-height": "2em",
                    "margin": "1.2em auto 0",
                    "text-align": "center",
                    "width": "36%"
                }
            },
            "c60_fbar_my_head_degree": {
                "CSS": {
                    "border": "1px solid #ebf862",
                    "color": "#fffd53",
                    "font-size": "0.675em",
                    "font-style": "italic"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "Lv"
                }
            },
            "c60_fbar_my_head_ico": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/mybg_green.png')"
                },
                "JS": {
                    "isShow": true
                }
            },
            "c60_fbar_my_head_member": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/rili.png')",
                    "color": "#0d7164",
                    "font-size": ".875em"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "会员日",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_head_member_redpoint": {
                "CSS": {
                    "-moz-border-radius": "0.45em",
                    "-webkit-border-radius": "0.45em",
                    "background": "#f03333",
                    "border-radius": "0.45em",
                    "display": "none",
                    "height": "0.45em",
                    "position": "absolute",
                    "right": "-0.7em",
                    "top": "-0.1em",
                    "width": "0.45em"
                }
            },
            "c60_fbar_my_head_member_tips": {
                "JS": {
                    "memberday": "7,17,27",
                    "text": "17wo会员日为每月7号、17号、27号<br/><span>会员日</span>当天记得<span>点击</span><br/><span>有惊喜哦！</span>",
                    "title": "会员日tips"
                }
            },
            "c60_fbar_my_head_rule": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/my_rule_ico.png')",
                    "color": "#0d7164",
                    "font-size": "0.7em"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "规则"
                }
            },
            "c60_fbar_my_head_rule_tips": {
                "JS": {
                    "listdesc1": "1）连续签到5天：赠<span>50</span>沃豆",
                    "listdesc2": "2）连续签到6~29天：赠<span>70</span>沃豆",
                    "listdesc3": "3）连续签到30天以上：赠<span>100</span>沃豆",
                    "textbegin": "亲，可以用沃豆参加[",
                    "textbtn": "欢乐抽奖",
                    "textend": "]赢流量哦！",
                    "title": "签到有礼规则说明"
                }
            },
            "c60_fbar_my_latestactivity": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/my_mysale_ico_01.png')"
                },
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": true,
                            "text": "我要刮"
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "最新营销活动",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_list_discount": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/youhui.png')"
                },
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": false
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "2",
                    "text": "我的优惠",
                    "url": "http://www.10010.com"
                }
            },
            "c60_fbar_my_list_growup": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/wodechengzhang.png')"
                },
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": false
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "我的成长",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_list_privilege": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/wodetequan.png')"
                },
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": false
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": false,
                    "text": "我的特权"
                }
            },
            "c60_fbar_my_list_red": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/wodehongbao.png')"
                },
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": false
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "2",
                    "text": "我的红包",
                    "url": "http://www.10010.com"
                }
            },
            "c60_fbar_my_list_red_hairred": {
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": true,
                            "text": "派红包"
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "有流量就是任性",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_list_red_openred": {
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": true,
                            "text": "开红包"
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "天天有红包，每日一开",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_list_set": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/wodeshezhi.png')"
                },
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": false
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "设置"
                }
            },
            "c60_fbar_my_list_subitem_btn_link": {
                "CSS": {
                    "-moz-border-radius": "2.5em",
                    "-webkit-border-radius": "2.5em",
                    "background": "#ff7d55",
                    "border-radius": "2.5em",
                    "color": "#fff",
                    "font-size": "0.7em",
                    "height": "2.5em",
                    "line-height": "2.5em",
                    "text-align": "center",
                    "width": "6.5em"
                }
            },
            "c60_fbar_my_list_task": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/woderenwu.png')"
                },
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": true,
                            "text": "任务小提示"
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "我的任务",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_list_wealth": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/wodejinbi.png')"
                },
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": true,
                            "text": "积分换流量"
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "2",
                    "text": "我的财富",
                    "url": "http://www.10010.com"
                }
            },
            "c60_fbar_my_luckdraw": {
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": true,
                            "text": "沃豆抽奖"
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "沃豆",
                    "unit": "个",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_preferences": {
                "JS": {
                    "c60_fbar_arrow_jump_text": {
                        "JS": {
                            "isShow": true,
                            "text": "去看看"
                        }
                    },
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "老客户特惠区",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_result_link_btn": {
                "CSS": {
                    "background": "#73d7bd",
                    "color": "#fff",
                    "font-size": "1em",
                    "height": "2.27em",
                    "line-height": "2.27em",
                    "text-align": "center",
                    "width": " 65%"
                },
                "JS": {
                    "action": "0",
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "去首页看看"
                }
            },
            "c60_fbar_my_rule_textbtn": {
                "CSS": {
                    "color": "#ff7043",
                    "text-decoration": "underline"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "欢乐抽奖",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            },
            "c60_fbar_my_tips_closebtn": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/close2.png')"
                },
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_my_tips_failurebtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "text": "ok"
                }
            },
            "c60_fbar_my_tips_successbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": true,
                    "linktype": "0",
                    "text": "去抽奖",
                    "url": "http://wo.com?jsessionid={jsessionid}&c={auth}&msisdn={msisdn}"
                }
            }
        }
    },
    "mytitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "我的"
                }
            }
        }
    }
};
window.page_PropertyMap["isitenavigation_propertyTable"] = {
    "csitenavigation": {
        "CSS": {},
        "JS": {
            "c60_fbar_app_result_con": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "showconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    },
                    "statusconfig": {
                        "status": "2",
                        "status1": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/404.jpg'",
                            "tipstxt": "不要阻止我，我要去天台思考人生"
                        },
                        "status2": {
                            "btntxt": "返回",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/gongchengshi.jpg'",
                            "tipstxt": "攻程狮正在奋力开采中，敬请期待!"
                        },
                        "status3": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                            "tipstxt": "我也是醉了，系统出小差了"
                        }
                    }
                }
            },
            "c60_fbar_dald_li": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_dalt_colorline_green": {
                "background": "#73d7bd"
            },
            "c60_fbar_dalt_colorline_orange": {
                "background": "#ff7043"
            },
            "c60_fbar_dalt_green_txt": {
                "color": "#73d7bd"
            },
            "c60_fbar_dalt_link": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_dalt_orange_txt": {
                "color": "#ff7043"
            },
            "c60_fbar_link_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "sitenavigation": {
                "CSS": {
                    "padding-top": "0em"
                }
            }
        }
    },
    "sitenavigationtitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "网站导航"
                }
            }
        }
    }
};
window.page_PropertyMap["ispeedpage_propertyTable"] = {
    "idashboard": {
        "CSS": {},
        "JS": {
            "aftertesttext": "重新测速",
            "beforetesttext": "开始测速",
            "c60_fbar_cs_btn_link": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "failimagesrc": "'" + top.tlbs.templatePath + "/images/ce_fail.png'",
            "network": "--",
            "networktitle": "连接方式",
            "result": "测速结果",
            "speed": "--",
            "speedconfig": {
                "state0": {
                    "desc": "平均网速",
                    "detail1": "当前网速击败了全国",
                    "detail2": "的用户",
                    "imagesrc": "'" + top.tlbs.templatePath + "/images/ce_zixingche.png'",
                    "linewidthpercent": "14",
                    "maxvalue": "20",
                    "percent": "6"
                },
                "state1": {
                    "imagesrc": "'" + top.tlbs.templatePath + "/images/ce_motuoche.png'",
                    "linewidthpercent": "34",
                    "maxvalue": "50",
                    "minvalue": "20",
                    "percent": "30"
                },
                "state2": {
                    "imagesrc": "'" + top.tlbs.templatePath + "/images/ce_xiaoqiche.png'",
                    "linewidthpercent": "54",
                    "maxvalue": "100",
                    "minvalue": "50",
                    "percent": "50"
                },
                "state3": {
                    "imagesrc": "'" + top.tlbs.templatePath + "/images/ce_feiji.png'",
                    "linewidthpercent": "74",
                    "maxvalue": "200",
                    "minvalue": "100",
                    "percent": "70"
                },
                "state4": {
                    "imagesrc": "'" + top.tlbs.templatePath + "/images/ce_huojian.png'",
                    "linewidthpercent": "100",
                    "minvalue": "200",
                    "percent": "99"
                }
            },
            "speedtitle": "平均网速",
            "speedunit": "KB/S",
            "speedvalue": "0.00",
            "testingtext": "测速中...",
            "timeout": "5",
            "tips": "网络测速会消耗少量流量，但是后续会由运营商补还给您。",
            "tipstitle": "温馨提示："
        }
    },
    "ispeedpagetitle": {
        "CSS": {
            "border-bottom-color": "#f8f8f8"
        },
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "网络测速"
                }
            }
        }
    }
};
window.page_PropertyMap["istorefee_propertyTable"] = {
    "istorefeeholder": {
        "CSS": {
            "height": "95%",
            "width": "100%",
            "background": "#ff7d55"
        },
        "JS": {}
    },
    "storefee": {
        "CSS": {},
        "JS": {
            "buttonconfig": {
                "text": "预约升档"
            },
            "changeorderdbtn": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                }
            },
            "comments": {
                "text": "注：预约变更后，24小时内将有人员为您处理，协议变更需要下月生效，多次变更以最后一次提交为准。"
            },
            "cssconfig": {
                "0": {
                    "CSS": {
                        "font-size": "0.8em",
                        "width": "90%"
                    }
                },
                "1": {
                    "CSS": {
                        "font-size": "0.8em",
                        "width": "33%"
                    }
                },
                "2": {
                    "CSS": {
                        "font-size": "0.8em",
                        "width": "33%"
                    }
                },
                "3": {
                    "CSS": {
                        "font-size": "0.8em",
                        "margin-left": "0%",
                        "width": "33%"
                    }
                }
            },
            "effectconfig": {
                "0": {
                    "value": "本月生效"
                },
                "1": {
                    "value": "下月生效"
                }
            },
            "keyconfig": {
                "1": {
                    "key": "语音"
                },
                "2": {
                    "key": "流量"
                },
                "3": {
                    "key": "短信"
                }
            },
            "priceunit": {
                "isShow": true,
                "value": "￥"
            },
            "txtdesc": {
                "CSS": {
                    "color": "#ff7d55",
                    "font-size": "0.8em"
                }
            }
        }
    },
    "storefeemainholder": {
        "CSS": {
            "height": "100%",
            "width": "100%"
        },
        "JS": {}
    },
    "istorefeetitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "存费送机"
                }
            }
        }
    }
};
window.page_PropertyMap["itaocanresult_propertyTable"] = {
    "itaocanresulttitle": {
        "CSS": {
            "background-size": "1.6em 1.6em",
            "background-repeat": "no-repeat",
            "background-position": "0.7em center",
            "background-image": "url('" + top.tlbs.templatePath + "/images/toback.png')"
        },
        "JS": {
            "cdrConfig": {
                "uitracingcdr": {
                    "cdrType": "uitracingcdr",
                    "enable": true,
                    "storeData": false
                }
            },
            "clickable": true,
            "titletextconfig": {
                "JS": {
                    "textdata": "结果页面"
                }
            }
        }
    },
    "taocanresult": {
        "CSS": {},
        "JS": {
            "c60_fbar_link_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "loadingtext": {
                "JS": {
                    "textdata": "爱我，别走~~"
                }
            },
            "resultsconfig": {
                "JS": {
                    "0": {
                        "action": "0",
                        "backaction": "1",
                        "btntxt": "去首页看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/success.jpg'",
                        "tipstxt": "OK，订购成功！我就那么酷，不服憋着!"
                    },
                    "1-FFF-1-AAA": {
                        "action": "0",
                        "btntxt": "去首页看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "对不起，订购失败，请稍后再试!"
                    },
                    "1-FFF-1-FFE": {
                        "action": "0",
                        "btntxt": "去首页看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "对不起，订购失败，请稍后再试!"
                    },
                    "1-FFF-1-FFF": {
                        "action": "0",
                        "btntxt": "去首页看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "对不起，订购失败，请稍后再试!"
                    },
                    "1": {
                        "action": "1",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/404.jpg'",
                        "tipstxt": "不要阻止我，我要去天台思考人生!"
                    },
                    "10": {
                        "action": "0",
                        "backaction": "1",
                        "btntxt": "去首页看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/success.jpg'",
                        "tipstxt": "OK，订购成功！我就那么酷，不服憋着!"
                    },
                    "2": {
                        "action": "0",
                        "btntxt": "去首页看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/gongchengshi.jpg'",
                        "tipstxt": "工程狮正在奋力开采中，敬请期待!"
                    },
                    "3": {
                        "action": "1",
                        "btntxt": "返回看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "我也是醉了，系统出小差了!"
                    },
                    "default": {
                        "action": "0",
                        "btntxt": "去首页看看",
                        "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                        "tipstxt": "我也是醉了，系统出小差了!"
                    }
                }
            }
        }
    }
};
window.page_PropertyMap["npackageactivity_propertyTable"] = {
    "imagelist": {
        "CSS": {},
        "JS": {
            "adposid": "1",
            "c60_fbar_link_click": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            }
        }
    },
    "nptitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "办4G套餐送家庭流量共享包"
                }
            }
        }
    },
    "packageactivity": {
        "CSS": {},
        "JS": {
            "activityDesc": "移动数据与副号共享，最多可开通4个副号，主号默认为副号全额付款。套餐失效时赠送的来电显示需向客户确认是否保留转正常收费，如客户确认不保留或无确认则自动关闭，移动数据流量不再赠送。",
            "activityID": "1",
            "c60_fbar_buy_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": true
                        }
                    }
                }
            },
            "c60_fbar_icon_click": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_left_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_link_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_pkgact_btn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_pkgact_effective1": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_pkgact_effective2": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_pkgact_result_con": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "showconfig": {
                        "status": "0",
                        "status0": {
                            "display": "none"
                        },
                        "status1": {
                            "display": "block"
                        }
                    },
                    "statusconfig": {
                        "status": "2",
                        "status1": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/404.jpg'",
                            "tipstxt": "不要阻止我，我要去天台思考人生"
                        },
                        "status2": {
                            "btntxt": "去首页看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/gongchengshi.jpg'",
                            "tipstxt": "攻程狮正在奋力开采中，敬请期待!"
                        },
                        "status3": {
                            "btntxt": "返回看看",
                            "imgUrl": "'" + top.tlbs.templatePath + "/images/zuile.jpg'",
                            "tipstxt": "我也是醉了，系统出小差了"
                        }
                    }
                }
            },
            "c60_fbar_right_itbtn": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "errorcode": "1-FFF-1-FFF",
            "native": {
                "JS": {
                    "btn": {
                        "statusconfig": {
                            "state": {
                                "display": "none"
                            },
                            "state0": {
                                "display": "block"
                            }
                        }
                    },
                    "icon": {
                        "statusconfig": {
                            "state": {
                                "display": "none"
                            },
                            "state0": {
                                "background-image": "url('" + top.tlbs.templatePath + "/images/roright.png')",
                                "background-position": "right center",
                                "background-repeat": "no-repeat"
                            }
                        }
                    },
                    "index": "0",
                    "last": "0",
                    "option": {
                        "statusconfig": {
                            "state": {
                                "display": "none"
                            },
                            "state0": {
                                "display": "block"
                            }
                        }
                    }
                }
            },
            "packageeffectstate": {
                "JS": {
                    "stateconfig": {
                        "0": {
                            "value": "立即生效"
                        },
                        "1": {
                            "value": "下月生效"
                        },
                        "2": {
                            "value": "立即生效/下月生效"
                        },
                        "3": {
                            "value": "其他"
                        },
                        "4": {
                            "value": "首开立即生效，变更次月生效。"
                        }
                    }
                }
            },
            "popblockconfig": {
                "JS": {
                    "btnconfig": {
                        "state0": {
                            "color": "#222",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        },
                        "state1": {
                            "color": "#ff7d55",
                            "font-size": "1em",
                            "padding": "1.1em 0"
                        }
                    },
                    "effectivewayconfig": {
                        "state": "1",
                        "state0": {
                            "background": "#73d7bd",
                            "color": "#fff",
                            "font-size": ".875em",
                            "line-height": "2.5em",
                            "text-align": "center"
                        },
                        "state1": {
                            "background": "#eee",
                            "color": "#555",
                            "font-size": ".875em",
                            "line-height": "2.5em",
                            "text-align": "center"
                        },
                        "state2": {
                            "color": "#222"
                        }
                    },
                    "icoconfig": {
                        "background-image": "url('" + top.tlbs.templatePath + "/images/haveatea.jpg')",
                        "background-repeat": "no-repeat",
                        "background-size": "3.73em 3.73em",
                        "height": "3.73em",
                        "width": "3.73em"
                    },
                    "packagenameconfig": {
                        "color": "#73d7bd",
                        "padding": "0 0 0 0.25em"
                    }
                }
            },
            "tipholder": {
                "CSS": {
                    "-moz-border-radius": "4em",
                    "-moz-box-sizing": "border-box",
                    "-webkit-border-radius": "4em",
                    "-webkit-box-sizing": "border-box",
                    "background": "rgba(0,0,0,0.5)",
                    "border-radius": "4em",
                    "bottom": "9em",
                    "box-sizing": "border-box",
                    "display": "none",
                    "height": "4em",
                    "left": "50%",
                    "margin-left": "-35%",
                    "padding": "0.8em 1.5em",
                    "position": "absolute",
                    "text-align": "center",
                    "width": "70%",
                    "z-index": "2047483647"
                },
                "JS": {
                    "timeout": "3"
                }
            }
        }
    }
};
window.page_PropertyMap["overbuy_propertyTable"] = {
    "overbuytitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "已订购套餐"
                }
            }
        }
    }
};
window.page_PropertyMap["receive_propertyTable"] = {
    "receivetitle": {
        "CSS": {},
        "JS": {
            "titletextconfig": {
                "JS": {
                    "textdata": "收货人信息"
                }
            }
        }
    },
    "receiveinfo": {
        "CSS": {},
        "JS": {
            "button": {
                "CSS": {
                    "background": "#ff7d55",
                    "color": "#fff"
                },
                "JS": {
                    "text": "确认办理"
                }
            },
            "confirmbtn": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": false
                    }
                }
            },
            "inputtext": {
                "text": "请输入收货地址",
                "tips": "*您还未填写收货人地址"
            },
            "receiveinfoaddress": {
                "text": "收货人地址："
            },
            "receiveinfocolor": {
                "CSS": {
                    "color": "#666"
                },
                "JS": {
                    "text": "颜色："
                }
            },
            "receiveinfomemory": {
                "text": "内存："
            },
            "receiveinfoname": {
                "text": "版本："
            },
            "receiveinfopkg": {
                "name": "12个月存费送机",
                "text": "合约套餐："
            },
            "tips_txt": {
                "text": "1.完成预约后请准备好身份证复印件并耐心等待，我们会有专人在 3-4个工作日内完成配送，配送上门需要户主本人确认并签收协议。<br/>2.若收货地址为空，我们会默认使用您的出账地址和本机号码作为联系方式。<b class='orange'>客服热线：4000210186</b>"
            },
            "tiptitle": {
                "CSS": {
                    "color": "#ff7a03"
                },
                "JS": {
                    "text": "温馨提示："
                }
            }
        }
    }
};
window.page_PropertyMap["summarypage_propertyTable"] = {
    "guide": {
        "CSS": {},
        "JS": {
            "stepconfig": {
                "step1": {
                    "background": "url('" + top.tlbs.templatePath + "/images/yindao_ico_01.png')",
                    "background-position": "right top",
                    "background-repeat": "no-repeat",
                    "background-size": "50% 20%",
                    "height": "100%",
                    "position": "absolute",
                    "right": "0",
                    "top": "0",
                    "width": "100%"
                },
                "step2": {
                    "background": "url('" + top.tlbs.templatePath + "/images/yindao_ico_02.png')",
                    "background-position": "center 15%",
                    "background-repeat": "no-repeat",
                    "background-size": "90% 30%",
                    "height": "100%",
                    "left": "0",
                    "position": "absolute",
                    "top": "0",
                    "width": "100%"
                },
                "step3": {
                    "background": "url('" + top.tlbs.templatePath + "/images/yindao_ico_03.png')",
                    "background-position": "center 56%",
                    "background-repeat": "no-repeat",
                    "background-size": "95% 15%",
                    "height": "100%",
                    "position": "absolute",
                    "right": "0",
                    "top": "0",
                    "width": "100%"
                },
                "step4": {
                    "background": "url('" + top.tlbs.templatePath + "/images/yindao_ico_04.png')",
                    "background-position": "center 83%",
                    "background-repeat": "no-repeat",
                    "background-size": "50% 30%",
                    "height": "100%",
                    "left": "0",
                    "position": "absolute",
                    "top": "0",
                    "width": "100%"
                }
            }
        }
    },
    "summary": {
        "CSS": {
            "background-color": "#73d7bd"
        },
        "JS": {
            "c60_fbar_liul_tab_li": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "c60_fbar_trafficball": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "datadesc": {
                "1": {
                    "dayleftdesc": "日均可用",
                    "overflowdesc": "超出时长",
                    "remaindesc": "剩余时长",
                    "totaldesc": "总时长",
                    "useddesc": "已用时长"
                },
                "2": {
                    "dayleftdesc": "日均可用",
                    "overflowdesc": "超出流量",
                    "remaindesc": "剩余流量",
                    "totaldesc": "总流量",
                    "useddesc": "已用流量"
                },
                "4": {
                    "dayleftdesc": "日均可用",
                    "overflowdesc": "超出时长",
                    "remaindesc": "剩余时长",
                    "totaldesc": "总时长",
                    "useddesc": "已用时长"
                },
                "8": {
                    "dayleftdesc": "日均可用",
                    "overflowdesc": "超出",
                    "remaindesc": "剩余",
                    "totaldesc": "总量",
                    "useddesc": "已用"
                }
            },
            "errortipsconfig": {
                "CSS": {
                    "height": "80%",
                    "padding-top": "5em",
                    "text-align": "center",
                    "width": "100%"
                },
                "JS": {
                    "desc": {
                        "color": "#000",
                        "font-size": "0.9625em",
                        "margin-top": "0.75em",
                        "text-align": "center",
                        "width": "100%"
                    },
                    "errorcodetips": {
                        "1-FFF-1-FFD": {
                            "CSS": {
                                "background-image": "url('" + top.tlbs.templatePath + "/images/queryerror.png')",
                                "background-position": "center 60%",
                                "background-size": "8em 4em"
                            },
                            "JS": {
                                "description": "亲，您本月开通的套餐要下月才能查到哦~"
                            }
                        },
                        "default": {
                            "CSS": {
                                "background-image": "url('" + top.tlbs.templatePath + "/images/queryerror.png')",
                                "background-position": "center 60%",
                                "background-size": "8em 4em"
                            },
                            "JS": {
                                "description": "网络好挤，您过会再点吧或看看其他好玩的"
                            }
                        },
                        "nodata": {
                            "CSS": {
                                "background-image": "url('" + top.tlbs.templatePath + "/images/querynull.png')",
                                "background-position": "center center",
                                "background-size": "8em 2em"
                            },
                            "JS": {
                                "description": "我和小伙伴都惊呆了，竟然一个套餐都木有"
                            }
                        }
                    },
                    "icon": {
                        "-moz-border-radius": "12.5em",
                        "-webkit-border-radius": "12.5em",
                        "background-repeat": "no-repeat",
                        "border": "0.125em solid #d4fdf2",
                        "border-radius": "12.5em",
                        "height": "12.5em",
                        "margin": "0 auto",
                        "padding": "0.3125em",
                        "text-align": "center",
                        "width": "12.5em"
                    },
                    "text": {
                        "background-size": "7.6em 1.8em",
                        "display": "inline-block",
                        "height": "1.8em",
                        "margin-top": "6em",
                        "width": "7.6em"
                    }
                }
            },
            "showCategoryTab": true,
            "showItem": "total,used",
            "state0": {
                "config": {
                    "ballStyle": {
                        "border-color": "#ff5c5c"
                    },
                    "descConfig": {
                        "alarm": {
                            "style": {
                                "color": "#ff5c5c",
                                "text-shadow": "0 0 .5em rgba(0,0,0,0.5)"
                            },
                            "text": "告急!"
                        },
                        "desc": {
                            "style": {
                                "color": "#0d7164"
                            }
                        },
                        "exceeddesc": {
                            "style": {
                                "color": "#ff5c5c"
                            }
                        },
                        "exceednum": {
                            "style": {
                                "color": "#ff5c5c"
                            }
                        },
                        "num": {
                            "style": {
                                "color": "#fff"
                            }
                        }
                    },
                    "imageStyle": {
                        "background-image": "url('" + top.tlbs.templatePath + "/images/red_Bw.png')",
                        "background-repeat": "repeat-x"
                    }
                },
                "maxvalue": "20",
                "minvalue": "0"
            },
            "state1": {
                "config": {
                    "descConfig": {
                        "alarm": {
                            "style": {
                                "color": "#ff7d55",
                                "text-shadow": "0 0 .5em rgba(0,0,0,0.5)"
                            },
                            "text": "预警"
                        },
                        "desc": {
                            "style": {
                                "color": "#0d7164"
                            }
                        },
                        "num": {
                            "style": {
                                "color": "#fff"
                            }
                        }
                    },
                    "imageStyle": {
                        "background-image": "url('" + top.tlbs.templatePath + "/images/orange_Bw.png')",
                        "background-repeat": "repeat-x"
                    }
                },
                "maxvalue": "50",
                "minvalue": "20"
            },
            "state2": {
                "config": {
                    "descConfig": {
                        "alarm": {
                            "style": {
                                "color": "#73d7bd"
                            },
                            "text": " "
                        },
                        "desc": {
                            "style": {
                                "color": "#0d7164"
                            }
                        },
                        "num": {
                            "style": {
                                "color": "#fff"
                            }
                        }
                    },
                    "imageStyle": {
                        "background-image": "url('" + top.tlbs.templatePath + "/images/green_Bw.png')",
                        "background-repeat": "repeat-x"
                    }
                },
                "maxvalue": "100",
                "minvalue": "50"
            }
        }
    },
    "taocandetail": {
        "CSS": {},
        "JS": {
            "errodatatipsconfig": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/success.jpg')"
                },
                "JS": {
                    "description": "小主，系统繁忙，请稍后再试，看看其他的"
                }
            },
            "errortipsconfig": {
                "CSS": {
                    "-moz-box-sizing": "border-box",
                    "-webkit-box-sizing": "border-box",
                    "background-color": "#fff",
                    "box-sizing": "border-box",
                    "height": "100%",
                    "left": "0",
                    "overflow": "hidden",
                    "padding-top": "30%",
                    "position": "relative",
                    "top": "0",
                    "width": "100%",
                    "z-index": "2047483646"
                },
                "JS": {
                    "desc": {
                        "text-align": "center"
                    },
                    "errorcodetips": {
                        "default": {
                            "CSS": {
                                "background-image": "url('" + top.tlbs.templatePath + "/images/success.jpg')"
                            },
                            "JS": {
                                "description": "小主，系统繁忙，请稍后再试，看看其他的"
                            }
                        },
                        "nodata": {
                            "CSS": {
                                "background-image": "url('" + top.tlbs.templatePath + "/images/nodetail.jpg')"
                            },
                            "JS": {
                                "description": "小主，订个套餐吧！"
                            }
                        }
                    },
                    "icon": {
                        "background-size": "100% 100%",
                        "height": "5em",
                        "margin": "0 auto",
                        "width": "5em"
                    },
                    "text": {
                        "color": "#222222",
                        "font-size": "0.875em",
                        "height": "1.5em",
                        "line-height": "1.5em",
                        "margin-top": "0.6em",
                        "text-align": "center",
                        "width": "100%"
                    }
                }
            },
            "lineChart": {
                "JS": {
                    "chartConfig": {
                        "PolygonColor": "rgba(152, 151, 151, 0.2)",
                        "PolygonShow": true,
                        "XContentColor": "#000",
                        "XContentCurrentColor": "#73d7bd",
                        "XContentCurrentFont": "bold 0.8em/2em Arial",
                        "XContentFont": "0.8em/2em Arial",
                        "avgremainlineShow": true,
                        "avgremainlineStyle": "#73d7bd",
                        "avgremainlineWidth": "1",
                        "avgusedlineShow": true,
                        "avgusedlineStyle": "#ccc",
                        "avgusedlineWidth": "1",
                        "bgLineColor": "#F2F1F1",
                        "bgLineWidth": "2",
                        "isShowBgLine": true,
                        "isShowXContent": true,
                        "lineColor": "#73d7bd",
                        "lineWidth": "2",
                        "polyLineShow": true,
                        "polyPointColor": "#73d7bd",
                        "polyPointShow": true,
                        "showNumber": "7",
                        "spacing": "100",
                        "todayText": "今天",
                        "xStartSpacing": "60"
                    },
                    "chartText": {
                        "JS": {
                            "lefttext": {
                                "text": "剩余日均:"
                            },
                            "titletext": {
                                "isShow": true,
                                "text": "数据只含主套餐和叠加包流量，不含闲时和定向流量"
                            },
                            "usedtext": {
                                "text": "已用日均:"
                            }
                        }
                    }
                }
            },
            "link_overbuy": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    },
                    "isShow": false,
                    "text": "已订购套餐"
                }
            },
            "packwrapStyle": {
                "JS": {
                    "state0": {
                        "height": "auto",
                        "overflow": "hidden",
                        "padding-bottom": "none",
                        "padding-top": "1.2em",
                        "top": "12.5em"
                    },
                    "state1": {
                        "background": "#fff",
                        "height": "auto",
                        "overflow": "hidden",
                        "padding-bottom": "1em",
                        "padding-top": "1.2em",
                        "top": "0em",
                        "z-index": "2047483649"
                    }
                }
            },
            "state0": {
                "config": {
                    "faceStyle": {
                        "background-image": "url('" + top.tlbs.templatePath + "/images/yujing.png')",
                        "background-size": "1em 1em"
                    },
                    "lineStyle": {
                        "background-color": "#ff5c5c"
                    }
                },
                "maxvalue": "20",
                "minvalue": "0"
            },
            "state1": {
                "config": {
                    "faceStyle": {
                        "background-image": "url('" + top.tlbs.templatePath + "/images/orange_weixiao.png')",
                        "background-size": "1em 1em"
                    },
                    "lineStyle": {
                        "background-color": "#ff7d55"
                    }
                },
                "maxvalue": "50",
                "minvalue": "20"
            },
            "state2": {
                "config": {
                    "faceStyle": {
                        "background-image": "url('" + top.tlbs.templatePath + "/images/weixiao.png')",
                        "background-size": "1em 1em"
                    },
                    "lineStyle": {
                        "background-color": "#73d7bd"
                    }
                },
                "maxvalue": "100",
                "minvalue": "50"
            },
            "taocan_detail": {
                "showCategory": true
            },
            "taocan_xq_title": {
                "text": "本月流量使用情况："
            },
            "titleStyle": {
                "JS": {
                    "state0": {
                        "border-top": "1px solid #ccc",
                        "height": "2em",
                        "padding": "0 1em",
                        "top": "12.5em"
                    },
                    "state1": {
                        "background": "#fff",
                        "border-top": "none",
                        "height": "2em",
                        "padding": "0em 1em",
                        "top": "0em",
                        "z-index": "2047483650"
                    }
                }
            }
        }
    },
    "speedbtn": {
        "CSS": {
            "position": "absolute",
            "padding-left": "2em",
            "-moz-border-radius": "1.7em 0 0 1.7em",
            "border-radius": "1.7em 0 0 1.7em",
            "-webkit-border-radius": "1.7em 0 0 1.7em",
            "background-color": "#b9ebde",
            "display": "none",
            "z-index": "2047483647",
            "height": "1.7em",
            "background-size": "1.5em 1.5em",
            "font-size": "1em",
            "right": "0",
            "background-image": "url('" + top.tlbs.templatePath + "/images/cesu_ico.png')",
            "background-position": "0.3em 0.13em",
            "background-repeat": "no-repeat",
            "top": "3em"
        },
        "JS": {
            "cdrConfig": {
                "uitracingcdr": {
                    "cdrType": "uitracingcdr",
                    "enable": true,
                    "storeData": false
                }
            },
            "text": "测速",
            "textstyle": {
                "color": "#37a0d6",
                "display": "inline-block",
                "font-size": "0.75em",
                "height": "1.8em",
                "line-height": "1.8em",
                "margin-left": "0.3em",
                "margin-top": "0.25em",
                "padding-right": "0.4em"
            }
        }
    },
    "closebtn": {
        "CSS": {
            "position": "absolute",
            "height": "2.4em",
            "background-size": "1.6em 1.6em",
            "width": "5em",
            "display": "block",
            "right": "0em",
            "background-repeat": "no-repeat",
            "background-position": "2.8em 0.4em",
            "background-image": "url('" + top.tlbs.templatePath + "/images/close.png')",
            "top": "0em"
        },
        "JS": {
            "cdrConfig": {
                "uitracingcdr": {
                    "cdrType": "uitracingcdr",
                    "enable": true,
                    "storeData": false
                }
            }
        }
    },
    "iappiconholder": {
        "CSS": {},
        "JS": {
            "c60_fbar_drag": {
                "JS": {
                    "cdrConfig": {
                        "uitracingcdr": {
                            "cdrType": "uitracingcdr",
                            "enable": true,
                            "storeData": false
                        }
                    }
                }
            },
            "remind": {
                "CSS": {
                    "background-image": "url('" + top.tlbs.templatePath + "/images/wodetequan2.png')",
                    "background-repeat": "no-repeat",
                    "background-size": "100% 100%",
                    "height": ".8em",
                    "margin-right": "-3.2em",
                    "position": "absolute",
                    "right": "50%",
                    "top": ".5em",
                    "width": "2.4em"
                },
                "JS": {}
            }
        }
    },
    "detailbtn": {
        "CSS": {
            "position": "absolute",
            "height": "3.125em",
            "background-size": "3.125em 3.125em",
            "width": "3.125em",
            "z-index": "2047483648",
            "right": "1em",
            "background-repeat": "no-repeat",
            "top": "-1.5625em"
        },
        "JS": {
            "cdrConfig": {
                "uitracingcdr": {
                    "cdrType": "uitracingcdr",
                    "enable": true,
                    "storeData": false
                }
            },
            "state0": {
                "background-image": "url('" + top.tlbs.templatePath + "/images/detailbt.png')"
            },
            "state1": {
                "background-image": "url('" + top.tlbs.templatePath + "/images/detailbtg.png')"
            }
        }
    },
    "summaryload": {
        "CSS": {},
        "JS": {
            "autohide": "10000",
            "loadingtext": "加载中,请稍候"
        }
    },
    "messagebtn": {
        "CSS": {
            "position": "absolute",
            "height": "2em",
            "background-size": "contain",
            "width": "2em",
            "left": "0.625em",
            "background-repeat": "no-repeat",
            "background-image": "url('" + top.tlbs.templatePath + "/images/messages.png')",
            "top": "0.2em"
        },
        "JS": {
            "cdrConfig": {
                "uitracingcdr": {
                    "cdrType": "uitracingcdr",
                    "enable": true,
                    "storeData": false
                }
            },
            "defaultText": "99+",
            "queryStatusTimer": "60000",
            "state0": {
                "right": "-0.6em",
                "width": "1.2em"
            },
            "state1": {
                "right": "-1.2em",
                "width": "2.4em"
            },
            "textstyle": {
                "-webkit-border-radius": "1.2em",
                "background-color": "red",
                "border-radius": "1.2em",
                "color": "white",
                "display": "inline-block",
                "font-size": "1em",
                "height": "1.2em",
                "line-height": "1.2em",
                "moz-border-radius": "1.2em",
                "position": "absolute",
                "right": "-0.6em",
                "text-align": "center",
                "top": "-0.2em",
                "width": "1.2em"
            }
        }
    },
    "repackholder": {
        "CSS": {},
        "JS": {
            "p_package": {
                "cdrConfig": {
                    "uitracingcdr": {
                        "cdrType": "uitracingcdr",
                        "enable": true,
                        "storeData": true
                    }
                }
            },
            "packcolor": {
                "color0": "#90c666",
                "color1": "#e075bd"
            },
            "packnum": "2",
            "showdelay": "10000000",
            "sytipstitle": {
                "text": "给您推荐"
            }
        }
    }
};
window.page_EventMap["allappholder_eventChain"] = {};
window.page_EventMap["bimagenotify_eventChain"] = {
    "0X508000_recvd": {
        "type": "async",
        "on": "bimagenotify_iimagenotification",
        "event": "showNotification",
        "input": '{}',
        "nextaction": {}
    },
    "0X505000_recvd": {
        "type": "async",
        "on": "bimagenotify_iimagenotification",
        "event": "showNotification",
        "input": '{}',
        "nextaction": {}
    },
    "iimagenotification_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "iimagenotification_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["caipopupnotify_eventChain"] = {
    "0X503000_recvd": {
        "type": "async",
        "on": "caipopupnotify_ipopuptopcai",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "caipopupnotify_popupnotifycai",
            "event": "show",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"iguess"}',
                "nextaction": {}
            }
        }
    },
    "ipopupapprec_linkapp": {
        "type": "async",
        "on": "caipopupnotify_popupnotifycai",
        "event": "hide",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "summarypage_iappiconholder",
            "event": "notifytopage",
            "input": '{"linktype":"2","url":"iguess"}',
            "nextaction": {}
        }
    },
    "ipopuptopcai_notificationclose": {
        "type": "async",
        "on": "caipopupnotify_popupnotifycai",
        "event": "hide",
        "input": '',
        "nextaction": {}
    },
    "ipopuptopcai_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "ipopupapprec_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "ipopuptopcai_todetail": {
        "type": "async",
        "on": "caipopupnotify_popupnotifycai",
        "event": "hide",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "summarypage_iappiconholder",
            "event": "notifytopage",
            "input": '{"linktype":"2","url":"summarypage"}',
            "nextaction": {}
        }
    }
};
window.page_EventMap["guidepage_eventChain"] = {
    "0X501000_recvd": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_guide",
            "event": "show",
            "input": '',
            "nextaction": {
                "type": "sync",
                "on": "allappholder_appmainholder",
                "event": "changeState",
                "input": '{"cstate":"1"}',
                "nextaction": {}
            }
        }
    }
};
window.page_EventMap["ibuoy_eventChain"] = {
    "activetrafficquery_recvd": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ibuoy_buoy",
            "event": "show",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "update",
                "input": '{}',
                "nextaction": {}
            }
        }
    },
    "passivetrafficquerypserrorevent_recvd": {
        "type": "async",
        "on": "ibuoy_buoy",
        "event": "showerror",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summaryload",
            "event": "hide",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "showerror",
                "input": '{}',
                "nextaction": {}
            }
        }
    },
    "passivetrafficquerycommonerror_recvd": {
        "type": "async",
        "on": "ibuoy_buoy",
        "event": "showerror",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summaryload",
            "event": "hide",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "showerror",
                "input": '{}',
                "nextaction": {}
            }
        }
    },
    "activetrafficquerynodata_recvd": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summary",
            "event": "showerror",
            "input": '{"errorcode":"default"}',
            "nextaction": {}
        }
    },
    "activetrafficquerypserrorevent_recvd": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summary",
            "event": "showerror",
            "input": '{}',
            "nextaction": {}
        }
    },
    "passivetrafficquery_recvd": {
        "type": "async",
        "on": "ibuoy_buoy",
        "event": "show",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summary",
            "event": "update",
            "input": '{}',
            "nextaction": {}
        }
    },
    "activetrafficquerycommonerror_recvd": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summary",
            "event": "showerror",
            "input": '{}',
            "nextaction": {}
        }
    },
    "passivetrafficquerynodata_recvd": {
        "type": "async",
        "on": "ibuoy_buoy",
        "event": "showerror",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summaryload",
            "event": "hide",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "showerror",
                "input": '{"errorcode":"default"}',
                "nextaction": {}
            }
        }
    },
    "buoy_positionchange": {
        "type": "remote_svc",
        "on": "pos",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "buoy_click": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {
            "type": "sync",
            "on": "allappholder_appmainholder",
            "event": "changeState",
            "input": '{"cstate":"1"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"iactivity"}',
                "nextaction": {}
            }
        }
    },
    "buoy_init": {
        "type": "remote_svc",
        "on": "uidisplaycdr",
        "input": '{"templateId":"' + top.tlbs.templateID + '","sfilter":"displayResult,website,displayType,pageId,templateId,firstAccess","displayResult":"0","website":"' + top.tlbs.referer + '","pageId":"ibuoy","displayType":"1","firstAccess":"' + top.tlbs.firstflag + '"}',
        "shared": false,
        "nextaction": {
            "type": "remote_svc",
            "on": "passivetrafficquery",
            "event": "passivetrafficquery",
            "input": '{}',
            "shared": true,
            "nextaction": {
                "type": "remote_svc",
                "on": "notifications",
                "input": '{"sfilter":"sresptime","sresptime":"' + top.tlbs.sresptime + '"}',
                "shared": false,
                "nextaction": {
                    "type": "sync",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "changeCurrentPageIDB",
                    "input": '{"state":"0","pageid":"summarypage"}',
                    "nextaction": {
                        "type": "async",
                        "on": "ftsiappholdermasterpage_ftsiappholder",
                        "event": "lloadApps",
                        "input": '{"applist":"summarypage,cstore,itaocanresult,iframepage"}',
                        "nextaction": {
                            "type": "remote_svc",
                            "on": "packagestore",
                            "input": '{}',
                            "shared": false,
                            "nextaction": {}
                        }
                    }
                }
            }
        }
    }
};
window.page_EventMap["ipopupfeedback_eventChain"] = {
    "0X900004_recvd": {
        "type": "async",
        "on": "ipopupfeedback_popupfeedback",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ipopupfeedback_popupfeedback",
            "event": "show",
            "input": '',
            "nextaction": {}
        }
    },
    "popupfeedback_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["ipopupimgtext_eventChain"] = {
    "0X512000_recvd": {
        "type": "async",
        "on": "ipopupimgtext_popupimgtext",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupimgtext_popupimgtext",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "0X508000_recvd": {
        "type": "async",
        "on": "ipopupimgtext_popupimgtext",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupimgtext_popupimgtext",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "0X505000_recvd": {
        "type": "async",
        "on": "ipopupimgtext_popupimgtext",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupimgtext_popupimgtext",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "popupimgtext_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    },
    "popupimgtext_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["ipopupmessage_eventChain"] = {
    "0X505000_recvd": {
        "type": "async",
        "on": "ipopupmessage_popupmessage",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "0X508000_recvd": {
        "type": "async",
        "on": "ipopupmessage_popupmessage",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupmessage_popupmessage",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "popupmessage_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["ipopuppage_eventChain"] = {
    "ipopup_applinkclick": {
        "type": "remote_svc",
        "on": "mine",
        "input": '{"startNote":"1","noteNo":"10"}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1"}',
            "nextaction": {}
        }
    }
};
window.page_EventMap["ipopuppuretext_eventChain"] = {
    "0X503000_recvd": {
        "type": "async",
        "on": "ipopuppuretext_popuppuretext",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopuppuretext_popuppuretext",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "popuppuretext_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    },
    "popuppuretext_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["ipopupsign_eventChain"] = {
    "0X508000_recvd": {
        "type": "async",
        "on": "ipopupsign_popupsign",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupsign_popupsign",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "0X512000_recvd": {
        "type": "async",
        "on": "ipopupsign_popupsign",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupsign_popupsign",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "0X505000_recvd": {
        "type": "async",
        "on": "ipopupsign_popupsign",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupsign_popupsign",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "popupsign_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "popupsign_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["ipopupsim_eventChain"] = {
    "0X508000_recvd": {
        "type": "async",
        "on": "ipopupsim_popupsim",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ipopupsim_popupsim",
            "event": "show",
            "input": '',
            "nextaction": {}
        }
    },
    "popupsim_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "popupsim_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["ipopupstorefee_eventChain"] = {
    "0X507000_recvd": {
        "type": "async",
        "on": "ipopupstorefee_ipopuptopstorefee",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ipopupstorefee_storefeepkgrec",
            "event": "update",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "ipopupstorefee_ipopupstorefee",
                "event": "show",
                "input": '',
                "nextaction": {
                    "type": "sync",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "lloadApps",
                    "input": '{"applist":"istorefee,receive"}',
                    "nextaction": {}
                }
            }
        }
    },
    "ipopuptopstorefee_storefee": {
        "type": "async",
        "on": "ipopupstorefee_ipopupstorefee",
        "event": "hide",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "istorefee_storefee",
            "event": "update",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "istorefee_istorefeetitle",
                "event": "updateTitleText",
                "input": '',
                "nextaction": {
                    "type": "sync",
                    "on": "summarypage_iappiconholder",
                    "event": "notifytopage",
                    "input": '',
                    "nextaction": {}
                }
            }
        }
    },
    "ipopuptopstorefee_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "storefeepkgrec_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "storefeepkgrec_storefee": {
        "type": "async",
        "on": "ipopupstorefee_ipopupstorefee",
        "event": "hide",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "istorefee_storefee",
            "event": "update",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "istorefee_istorefeetitle",
                "event": "updateTitleText",
                "input": '',
                "nextaction": {
                    "type": "sync",
                    "on": "summarypage_iappiconholder",
                    "event": "notifytopage",
                    "input": '',
                    "nextaction": {}
                }
            }
        }
    },
    "ipopuptopstorefee_notificationclose": {
        "type": "async",
        "on": "ipopupstorefee_ipopupstorefee",
        "event": "hide",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["ipopupwelcome_eventChain"] = {
    "0X501000_recvd": {
        "type": "async",
        "on": "ipopupwelcome_popupwelcome",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ipopupwelcome_popupwelcome",
            "event": "show",
            "input": '',
            "nextaction": {}
        }
    },
    "popupwelcome_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["popupnotify_eventChain"] = {
    "0X502000_recvd": {
        "type": "async",
        "on": "popupnotify_ipopuptop",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "popupnotify_notifypkgrec",
            "event": "update",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"cstore"}',
                "nextaction": {
                    "type": "async",
                    "on": "popupnotify_popupnotify",
                    "event": "show",
                    "input": '{}',
                    "nextaction": {}
                }
            }
        }
    },
    "0X503000_recvd": {
        "type": "async",
        "on": "popupnotify_ipopuptop",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "popupnotify_notifypkgrec",
            "event": "update",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"cstore"}',
                "nextaction": {
                    "type": "async",
                    "on": "popupnotify_popupnotify",
                    "event": "show",
                    "input": '{}',
                    "nextaction": {}
                }
            }
        }
    },
    "ipopuptop_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "ipopuptop_notificationclose": {
        "type": "async",
        "on": "popupnotify_popupnotify",
        "event": "hide",
        "input": '{}',
        "nextaction": {}
    },
    "ipopuptop_todetail": {
        "type": "async",
        "on": "popupnotify_popupnotify",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_iappiconholder",
            "event": "notifytopage",
            "input": '{"url":"summarypage","linktype":"2"}',
            "nextaction": {}
        }
    },
    "ipopuptop_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    },
    "notifypkgrec_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "notifypkgrec_click": {
        "type": "async",
        "on": "popupnotify_popupnotify",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_iappiconholder",
            "event": "notifytopage",
            "input": '{"reload":"0","url":"cstore","linktype":"2"}',
            "nextaction": {
                "type": "async",
                "on": "cstore_store",
                "event": "changecurrent",
                "input": '{}',
                "nextaction": {}
            }
        }
    }
};
window.page_EventMap["ftsiappholdermasterpage_eventChain"] = {
    "titlecloseimagetouch_click0": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {
            "type": "sync",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "writeCPageCloseCDR",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageIDB",
                "input": '{"state":"0","pageid":"summarypage"}',
                "nextaction": {
                    "type": "async",
                    "on": "ibuoy_buoy",
                    "event": "startAutoStateChangeTimer",
                    "input": '',
                    "nextaction": {}
                }
            }
        }
    },
    "titlebackimagetouch_click1": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_repackholder",
            "event": "show",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "cstore_store",
                "event": "hideConfirmDialog",
                "input": '{}',
                "nextaction": {}
            }
        }
    },
    "titlebackimagetouch_click0": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "hideMoney",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["cstore_eventChain"] = {
    "cstoreshow_recvd": {
        "type": "remote_svc",
        "on": "packagestore",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "packagestore_recvd": {
        "type": "async",
        "on": "cstore_store",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "store_click0": {
        "type": "remote_svc",
        "on": "commonpkgsub",
        "event": "commonpkgsub",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "store_clickTime": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "commonpkgsub_recvd": {
        "type": "async",
        "on": "cstore_store",
        "event": "confirm",
        "input": '',
        "nextaction": {}
    },
    "commonpkgsubcommonerror_recvd": {
        "type": "async",
        "on": "cstore_store",
        "event": "queryerror",
        "input": '',
        "nextaction": {}
    },
    "commonpkgsubpserrorevent_recvd": {
        "type": "async",
        "on": "cstore_store",
        "event": "queryerror",
        "input": '',
        "nextaction": {}
    },
    "store_clickSubmit": {
        "type": "remote_svc",
        "on": "confirmpkgsub",
        "event": "confirmpkgsub",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "cstore_pkgsubresult",
            "event": "loading",
            "input": '',
            "nextaction": {}
        }
    },
    "confirmpkgsubpserrorevent_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "confirmpkgsubpssuberrorevent_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "confirmpkgsubcommonerror_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "confirmpkgcommonerror_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "confirmpkgsub_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "remote_svc",
            "on": "packagestore",
            "input": '',
            "shared": false,
            "nextaction": {
                "type": "async",
                "on": "cstore_store",
                "event": "delaytime",
                "input": '',
                "nextaction": {}
            }
        }
    },
    "pkgsubresult_click0": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_taocandetail",
            "event": "hide",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "summarypage_detailbtn",
                "event": "changState",
                "input": '',
                "nextaction": {}
            }
        }
    },
    "pkgsubresult_click1": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["goldcoin_eventChain"] = {
    "goldcoinshow_recvd": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "lloadApps",
        "input": '{"applist":"iguess,iappdownload,iminecoin,iframepage,iappsearchpage,iguesspeek"}',
        "nextaction": {
            "type": "remote_svc",
            "on": "querycommpany",
            "event": "querycommpany",
            "input": '{"total": ""}',
            "shared": false,
            "nextaction": {
                "type": "remote_svc",
                "on": "guessagain",
                "input": '',
                "shared": false,
                "nextaction": {}
            }
        }
    },
    "goldcoinlayout_coinbtn2Click": {
        "type": "async",
        "on": "ftsiappholdermasterpage_titlebackimagetouch",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {}
    },
    "goldcoinlayout_moneyhide": {
        "type": "async",
        "on": "ftsiappholdermasterpage_titlebackimagetouch",
        "event": "changeState",
        "input": '{"cstate":"1"}',
        "nextaction": {}
    },
    "goldcoinlayout_circletxt3Click": {
        "type": "remote_svc",
        "on": "mine",
        "input": '{"startNote":"1","noteNo":"10"}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"iminecoin"}',
            "nextaction": {}
        }
    },
    "goldcoinlayout_showcb": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "showProgress",
        "input": '',
        "nextaction": {
            "type": "remote_svc",
            "on": "querycommpany",
            "input": '',
            "shared": false,
            "nextaction": {}
        }
    },
    "goldcoinlayout_coinUpdated": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "hideProgress",
        "input": '',
        "nextaction": {}
    },
    "gcapplink_applinkClick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iguess"}',
        "nextaction": {}
    },
    "querycommpany_recvd": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "goldcoin_gmoney",
            "event": "update",
            "input": '',
            "nextaction": {}
        }
    },
    "querycommpanynodata_recvd": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "goldcoinlayout_coinbtn1Click": {
        "type": "remote_svc",
        "on": "sign",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "sign_recvd": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData2",
        "input": '',
        "nextaction": {}
    },
    "goldcoinlayout_coinIncreased": {
        "type": "async",
        "on": "goldcoin_gmoney",
        "event": "updateCoinsTotal",
        "input": '',
        "nextaction": {}
    },
    "gmoney_coinIncreased": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData3",
        "input": '',
        "nextaction": {}
    },
    "gmoney_click": {
        "type": "remote_svc",
        "on": "querycommpany",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "commpany_recvd": {
        "type": "async",
        "on": "goldcoin_gmoney",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "gmoney_click0": {
        "type": "remote_svc",
        "on": "sign",
        "event": "signcommpany",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "signcommpanyerrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "signcommpanycommonerrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "signcommpany_recvd": {
        "type": "async",
        "on": "goldcoin_gmoney",
        "event": "signData",
        "input": '',
        "nextaction": {}
    },
    "gmoney_init": {
        "type": "remote_svc",
        "on": "querycommpany",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "gmoney_applinkClick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iguess"}',
        "nextaction": {}
    },
    "gmoney_updaterror": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "itaocanresult_itaocanresulttitle",
            "event": "updateTitleText",
            "input": '{"stitle":"赚流量"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"itaocanresult"}',
                "nextaction": {}
            }
        }
    },
    "gmoney_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "goldcoinlayout_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "goldcoinlayout_showerror": {
        "type": "sync",
        "on": "goldcoin_gcapplink",
        "event": "hide",
        "input": '',
        "nextaction": {}
    },
    "goldcoinlayout_showsucc": {
        "type": "sync",
        "on": "goldcoin_gcapplink",
        "event": "show",
        "input": '',
        "nextaction": {}
    },
    "gmoney_showerror": {
        "type": "sync",
        "on": "goldcoin_gcapplink",
        "event": "hide",
        "input": '',
        "nextaction": {}
    },
    "gmoney_showsucc": {
        "type": "sync",
        "on": "goldcoin_gcapplink",
        "event": "show",
        "input": '',
        "nextaction": {}
    },
    "gcapplink_appdownClick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iappdownload"}',
        "nextaction": {}
    },
    "goldcoinlayout_shownotice": {
        "type": "async",
        "on": "ipopuppage_ipopup",
        "event": "show",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["iactivity_eventChain"] = {
    "inforcampaignpssuberrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "inforcampaignnodata_recvd": {
        "type": "async",
        "on": "iactivity_activity",
        "event": "errorupdate",
        "input": '{}',
        "nextaction": {}
    },
    "iactivityshow_recvd": {
        "type": "remote_svc",
        "on": "informationcampaign",
        "event": "inforcampaign",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "inforcampaigncommonerror_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "inforcampaign_recvd": {
        "type": "async",
        "on": "iactivity_activity",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "inforcampaignpserrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "activity_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "activity_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "topage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["iappdownload_eventChain"] = {
    "gaingoldcoinchain_recvd": {
        "type": "async",
        "on": "iappdownload_appdownload",
        "event": "gaingoldcoin",
        "input": '{}',
        "nextaction": {}
    },
    "iappdownloadshow_recvd": {
        "type": "remote_svc",
        "on": "querywochain",
        "event": "querywo",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "remote_svc",
            "on": "appquerychain",
            "event": "appquerychain",
            "input": '{}',
            "shared": false,
            "nextaction": {
                "type": "remote_svc",
                "on": "advertismentlocation",
                "event": "appdownadvert",
                "input": '{"adlocation":"3"}',
                "shared": false,
                "nextaction": {}
            }
        }
    },
    "appquerychainnodata_recvd": {
        "type": "async",
        "on": "iappdownload_appdownload",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "appquerychain_recvd": {
        "type": "async",
        "on": "iappdownload_appdownload",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "appdownadvert_recvd": {
        "type": "async",
        "on": "iappdownload_imagelistapp",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "querywo_recvd": {
        "type": "async",
        "on": "iappdownload_appdownload",
        "event": "querywo",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "iappdownload_iappsearch",
            "event": "querywo1",
            "input": '{}',
            "nextaction": {}
        }
    },
    "appdownload_more": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"MORE"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "appdownload_showerror": {
        "type": "sync",
        "on": "iappdownload_imagelistapp",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "sync",
            "on": "iappdownload_iappsearch",
            "event": "hide",
            "input": '{}',
            "nextaction": {}
        }
    },
    "appdownload_showsucc": {
        "type": "sync",
        "on": "iappdownload_imagelistapp",
        "event": "show",
        "input": '{}',
        "nextaction": {
            "type": "sync",
            "on": "iappdownload_iappsearch",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "appdownload_gaingoldcoinchain": {
        "type": "remote_svc",
        "on": "gaingoldcoinchain",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "appdownload_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "iappsearch_urltranslate": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"应用"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "imagelistapp_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "topage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["iframepage_eventChain"] = {};
window.page_EventMap["ifscoupon_eventChain"] = {
    "ifscouponshow_recvd": {
        "type": "remote_svc",
        "on": "usercoupondetails",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "usercoupondetails_recvd": {
        "type": "async",
        "on": "ifscoupon_ifscouponcomp",
        "event": "updateCouponData",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["iguess_eventChain"] = {
    "iguessshow_recvd": {
        "type": "remote_svc",
        "on": "guessagain",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "guess_guessagain": {
        "type": "remote_svc",
        "on": "guessagain",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "guessagain_recvd": {
        "type": "async",
        "on": "iguess_guess",
        "event": "getDataInit",
        "input": '',
        "nextaction": {}
    },
    "guessagainnodata_recvd": {
        "type": "async",
        "on": "iguess_guess",
        "event": "nodatarecvd",
        "input": '',
        "nextaction": {}
    },
    "guess_guesssuc": {
        "type": "remote_svc",
        "on": "guesssuc",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "guesssuc_recvd": {
        "type": "async",
        "on": "iguess_guess",
        "event": "guesssucRet",
        "input": '',
        "nextaction": {}
    },
    "guess_peek": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iguesspeek"}',
        "nextaction": {}
    },
    "guess_peek2": {
        "type": "async",
        "on": "iguesspeek_guesspeek",
        "event": "getDataInit",
        "input": '',
        "nextaction": {}
    },
    "guess_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "guess_updateCoinsTotal": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData3",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "goldcoin_gmoney",
            "event": "updateCoinsTotal",
            "input": '',
            "nextaction": {}
        }
    }
};
window.page_EventMap["iguesspeek_eventChain"] = {
    "guesspeek_goback": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["imine_eventChain"] = {
    "imineshow_recvd": {
        "type": "remote_svc",
        "on": "mine",
        "input": '{"startNote":"1","noteNo":"10"}',
        "shared": false,
        "nextaction": {}
    },
    "cmine_coinclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iminecoin"}',
        "nextaction": {}
    },
    "cmine_mysetclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imineset"}',
        "nextaction": {}
    },
    "iminesetshow_recvd": {
        "type": "remote_svc",
        "on": "querysetting",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "mine_recvd": {
        "type": "async",
        "on": "imine_cmine",
        "event": "getDataFromRet",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iminecoin_cminecoin",
            "event": "getDataFromRet",
            "input": '',
            "nextaction": {}
        }
    },
    "cmine_myattendClick": {
        "type": "remote_svc",
        "on": "sign",
        "event": "minesign",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "cmine_rulesClick": {
        "type": "async",
        "on": "ipopuppage_ipopup",
        "event": "show",
        "input": '',
        "nextaction": {}
    },
    "minesign_recvd": {
        "type": "async",
        "on": "imine_cmine",
        "event": "signRet",
        "input": '',
        "nextaction": {}
    },
    "cmine_updateCoinsTotal": {
        "type": "async",
        "on": "imine_cmine",
        "event": "updateCoinsTotal",
        "input": '',
        "nextaction": {}
    },
    "cmine_privilegeclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"ifscoupon"}',
        "nextaction": {}
    }
};
window.page_EventMap["iminecoin_eventChain"] = {
    "iminecoinshow_recvd": {
        "type": "remote_svc",
        "on": "mine",
        "input": '{"startNote":"1","noteNo":"10"}',
        "shared": false,
        "nextaction": {}
    },
    "cminecoin_goback": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imine"}',
        "nextaction": {}
    },
    "cminecoin_init": {
        "type": "remote_svc",
        "on": "mine",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "mine_recvd": {
        "type": "async",
        "on": "iminecoin_cminecoin",
        "event": "getDataFromRet",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iminecoin_cminecoin",
            "event": "getDataFromRet",
            "input": '',
            "nextaction": {}
        }
    },
    "cminecoin_sendExchange": {
        "type": "remote_svc",
        "on": "earntrafficexchange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "earntrafficexchange_recvd": {
        "type": "async",
        "on": "iminecoin_cminecoin",
        "event": "getExchangeRes",
        "input": '',
        "nextaction": {}
    },
    "cminecoin_sendTransfer": {
        "type": "remote_svc",
        "on": "virtualcointransfer",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "virtualcointransfer_recvd": {
        "type": "async",
        "on": "iminecoin_cminecoin",
        "event": "getTransferRes",
        "input": '',
        "nextaction": {
            "type": "remote_svc",
            "on": "querycommpany",
            "event": "querycommpany",
            "input": '{"total": ""}',
            "shared": false,
            "nextaction": {
                "type": "remote_svc",
                "on": "mine",
                "input": '{"startNote":"1","noteNo":"10"}',
                "shared": false,
                "nextaction": {}
            }
        }
    },
    "cminecoin_getTypes": {
        "type": "remote_svc",
        "on": "EarnTrafficComboQuery",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "EarnTrafficComboQuery_recvd": {
        "type": "async",
        "on": "iminecoin_cminecoin",
        "event": "getTypesFunc",
        "input": '',
        "nextaction": {}
    },
    "cminecoin_updateCoinsTotal": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData3",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "goldcoin_gmoney",
            "event": "updateCoinsTotal",
            "input": '',
            "nextaction": {}
        }
    }
};
window.page_EventMap["imineset_eventChain"] = {
    "querysetting_recvd": {
        "type": "async",
        "on": "imineset_cmineset",
        "event": "settingrecvd",
        "input": '{}',
        "nextaction": {}
    },
    "toolbarclose_recvd": {
        "type": "async",
        "on": "imineset_cmineset",
        "event": "closeFunc",
        "input": '{}',
        "nextaction": {}
    },
    "userfeedback_recvd": {
        "type": "async",
        "on": "imineset_cmineset",
        "event": "feedFunc",
        "input": '{}',
        "nextaction": {}
    },
    "cmineset_feedsubmit": {
        "type": "remote_svc",
        "on": "userfeedback",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "cmineset_setreturnback1": {
        "type": "remote_svc",
        "on": "setting",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "popPage",
            "input": '{}',
            "nextaction": {}
        }
    },
    "cmineset_closeToolbar": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {
            "type": "sync",
            "on": "ibuoy_buoy",
            "event": "hide",
            "input": '{}',
            "nextaction": {}
        }
    },
    "cmineset_close": {
        "type": "remote_svc",
        "on": "toolbarclose",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "cmineset_goback": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imine"}',
        "nextaction": {}
    },
    "cmineset_sendExchange": {
        "type": "remote_svc",
        "on": "guess",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "cmineset_setreturnback": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '{}',
        "nextaction": {}
    },
    "cmineset_tuiclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iminetui"}',
        "nextaction": {}
    }
};
window.page_EventMap["iminetui_eventChain"] = {
    "cminetui_tuisubmit": {
        "type": "remote_svc",
        "on": "userfeedback",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "cminetui_tuisubmitclose": {
        "type": "remote_svc",
        "on": "toolbarclose",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "toolbarclose_recvd": {
        "type": "sync",
        "on": "iminetui_cminetui",
        "event": "getDataFromRet",
        "input": '',
        "nextaction": {}
    },
    "cminetui_tuisuccess": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {
            "type": "sync",
            "on": "ibuoy_buoy",
            "event": "hide",
            "input": '',
            "nextaction": {}
        }
    }
};
window.page_EventMap["imsgbox_eventChain"] = {
    "imsgboxshow_recvd": {
        "type": "remote_svc",
        "on": "queryMessageList",
        "input": '{"flag":"-1","startNum":"1","number":"10"}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "summarypage_messagebtn",
            "event": "hidetxt",
            "input": '',
            "nextaction": {}
        }
    },
    "msgbox_queryMessageList": {
        "type": "remote_svc",
        "on": "queryMessageList",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "queryMessageList_recvd": {
        "type": "sync",
        "on": "imsgbox_msgbox",
        "event": "queryMessageListRecvd",
        "input": '',
        "nextaction": {}
    },
    "msgbox_deleteMessageDetail": {
        "type": "remote_svc",
        "on": "deleteMessageDetail",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "msgbox_queryMessageDetail": {
        "type": "remote_svc",
        "on": "queryMessageDetail",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "deleteMessageDetail_recvd": {
        "type": "sync",
        "on": "imsgbox_msgbox",
        "event": "deleteMessageDetailRecvd",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["imy_eventChain"] = {
    "imyshow_recvd": {
        "type": "remote_svc",
        "on": "querymemberinfo",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "lloadApps",
            "input": '{"applist":"ifscoupon,imineset"}',
            "nextaction": {}
        }
    },
    "querymemberinfo_recvd": {
        "type": "async",
        "on": "imy_cmy",
        "event": "memberinfo",
        "input": '',
        "nextaction": {}
    },
    "cmy_memberclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"会员日"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_backclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "cmy_attendclick": {
        "type": "remote_svc",
        "on": "sign",
        "event": "mysign",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "mysign_recvd": {
        "type": "async",
        "on": "imy_cmy",
        "event": "signRet",
        "input": '',
        "nextaction": {}
    },
    "mysigncommonerror_recvd": {
        "type": "async",
        "on": "imy_cmy",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "cmy_rulebtnclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"欢乐抽奖"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_successbtnclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"欢乐抽奖"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_flowcurrencyclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"兑换流量币"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_luckdrawclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"欢乐抽奖"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_openredclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"开红包"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_hairredclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"派红包"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_privilegeclick": {
        "type": "remote_svc",
        "on": "usercoupondetails",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"ifscoupon"}',
            "nextaction": {}
        }
    },
    "cmy_latestactivityclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"最新营销活动"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_oldcustomerpreferencesclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"老客户特惠区"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_growupclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"我的成长"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_taskclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"我的任务"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_setclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imineset"}',
        "nextaction": {}
    }
};
window.page_EventMap["isitenavigation_eventChain"] = {
    "isitenavigationshow_recvd": {
        "type": "remote_svc",
        "on": "snavigation",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "snavigation_recvd": {
        "type": "async",
        "on": "isitenavigation_csitenavigation",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "csitenavigation_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "csitenavigation_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["ispeedpage_eventChain"] = {
    "ispeedpageshow_recvd": {
        "type": "remote_svc",
        "on": "initspeed",
        "input": '',
        "shared": true,
        "nextaction": {}
    },
    "idashboard_updatesucess": {
        "type": "remote_svc",
        "on": "recordspeed",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "summarypage_speedbtn",
            "event": "showtxt",
            "input": '',
            "nextaction": {}
        }
    },
    "idashboard_updatefail": {
        "type": "async",
        "on": "summarypage_speedbtn",
        "event": "showtxt",
        "input": '{"text":"测速"}',
        "nextaction": {}
    }
};
window.page_EventMap["istorefee_eventChain"] = {
    "storefee_receive": {
        "type": "async",
        "on": "receive_receiveinfo",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "sync",
            "on": "allappholder_appmainholder",
            "event": "changeState",
            "input": '{"cstate":"1"}',
            "nextaction": {
                "type": "sync",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"receive"}',
                "nextaction": {}
            }
        }
    }
};
window.page_EventMap["itaocanresult_eventChain"] = {
    "itaocanresulttitle_click0": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '{}',
        "nextaction": {}
    },
    "itaocanresulttitle_click1": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "taocanresult_changebackbtn": {
        "type": "async",
        "on": "itaocanresult_itaocanresulttitle",
        "event": "updateState",
        "input": '',
        "nextaction": {}
    },
    "taocanresult_click0": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_taocandetail",
            "event": "hide",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "summarypage_detailbtn",
                "event": "changState",
                "input": '',
                "nextaction": {}
            }
        }
    },
    "taocanresult_click1": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["npackageactivity_eventChain"] = {
    "npackageactivityshow_recvd": {
        "type": "async",
        "on": "npackageactivity_packageactivity",
        "event": "initPage",
        "input": '',
        "nextaction": {
            "type": "remote_svc",
            "on": "advertismentlocation",
            "input": '{"adlocation":"1"}',
            "shared": false,
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "changesrc",
                "input": '{"ordersrc":"npackageactivity"}',
                "nextaction": {}
            }
        }
    },
    "imagelist_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "topage",
        "input": '',
        "nextaction": {}
    },
    "packageactivity_init": {
        "type": "remote_svc",
        "on": "packageactivity",
        "event": "packageactivity",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "packageactivity_recvd": {
        "type": "async",
        "on": "npackageactivity_packageactivity",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "packageactivitynodata_recvd": {
        "type": "async",
        "on": "npackageactivity_packageactivity",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "advertismentlocation_recvd": {
        "type": "async",
        "on": "npackageactivity_imagelist",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "packageactivity_click0": {
        "type": "remote_svc",
        "on": "commonpkgsub",
        "event": "pkgactivity",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "pkgactivitypserrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "pkgactivitypssuberrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "pkgactivitycommonerror_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "pkgactivity_recvd": {
        "type": "async",
        "on": "npackageactivity_packageactivity",
        "event": "getInfo",
        "input": '',
        "nextaction": {}
    },
    "packageactivity_click1": {
        "type": "remote_svc",
        "on": "fjydproductpkg",
        "event": "fjydproductpkg",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "itaocanresult_itaocanresulttitle",
            "event": "updateTitleText",
            "input": '{"stitle":"套餐活动"}',
            "nextaction": {
                "type": "async",
                "on": "itaocanresult_taocanresult",
                "event": "loading",
                "input": '',
                "nextaction": {
                    "type": "async",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "changeCurrentPageID",
                    "input": '{"state":"1","pageid":"itaocanresult"}',
                    "nextaction": {}
                }
            }
        }
    },
    "fjydproductpkgpserrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "fjydproductpkgpssuberrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "fjydproductpkgcommonerror_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "fjydproductpkg_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "packageactivity_updaterror": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "itaocanresult_itaocanresulttitle",
            "event": "updateTitleText",
            "input": '{"stitle":"套餐活动"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"itaocanresult"}',
                "nextaction": {}
            }
        }
    },
    "packageactivity_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "packageactivity_showerror": {
        "type": "sync",
        "on": "npackageactivity_imagelist",
        "event": "hide",
        "input": '',
        "nextaction": {}
    },
    "packageactivity_showsucc": {
        "type": "sync",
        "on": "npackageactivity_imagelist",
        "event": "show",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["overbuy_eventChain"] = {
    "packageordered_recvd": {
        "type": "async",
        "on": "overbuy_buyovered",
        "event": "update",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["receive_eventChain"] = {
    "receiveinfo_confirmclick": {
        "type": "remote_svc",
        "on": "offlinepacksubscription",
        "event": "offlinepacksubscription",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "itaocanresult_itaocanresulttitle",
            "event": "updateTitleText",
            "input": '{"stitle":"确认信息"}',
            "nextaction": {
                "type": "async",
                "on": "itaocanresult_taocanresult",
                "event": "error",
                "input": '{"errorcode":"10"}',
                "nextaction": {
                    "type": "async",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "changeCurrentPageID",
                    "input": '{"state":"1","pageid":"itaocanresult"}',
                    "nextaction": {}
                }
            }
        }
    }
};
window.page_EventMap["summarypage_eventChain"] = {
    "trafficdetailsessionerror_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "trafficdetailpserrorevent_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "queryMessageStatus_recvd": {
        "type": "async",
        "on": "summarypage_messagebtn",
        "event": "queryMsgBox",
        "input": '{}',
        "nextaction": {}
    },
    "initspeed_recvd": {
        "type": "async",
        "on": "ispeedpage_idashboard",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "summarypageshow_recvd": {
        "type": "remote_svc",
        "on": "activetrafficquery",
        "event": "activetrafficquery",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "remote_svc",
            "on": "packagerecommandations",
            "input": '{}',
            "shared": true,
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"itaocanresult"}',
                "nextaction": {}
            }
        }
    },
    "packagerecommandations_recvd": {
        "type": "async",
        "on": "summarypage_repackholder",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "trafficdetailpssuberrorevent_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "trafficdetailcommonerror_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "trafficdetail_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "taocandetail_linkbuy": {
        "type": "remote_svc",
        "on": "packageordered",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"overbuy"}',
            "nextaction": {}
        }
    },
    "guide_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "summary_ballclick": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "show",
        "input": '{}',
        "nextaction": {
            "type": "remote_svc",
            "on": "activetrafficquery",
            "event": "activetrafficquery",
            "input": '{}',
            "shared": false,
            "nextaction": {}
        }
    },
    "speedbtn_btnclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"ispeedpage"}',
        "nextaction": {}
    },
    "closebtn_btnclick": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {
            "type": "sync",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "writeCPageCloseCDR",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageIDB",
                "input": '{"state":"0","pageid":"summarypage"}',
                "nextaction": {
                    "type": "async",
                    "on": "ibuoy_buoy",
                    "event": "startAutoStateChangeTimer",
                    "input": '{}',
                    "nextaction": {}
                }
            }
        }
    },
    "iappiconholder_embedpage": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"1"}',
        "nextaction": {
            "type": "async",
            "on": "iframepage_iframeholder",
            "event": "receive",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "iframepage_ifptitle",
                "event": "updateTitleText",
                "input": '{"stitle":"链接"}',
                "nextaction": {
                    "type": "async",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "changeCurrentPageID",
                    "input": '{"state":"1","pageid":"iframepage"}',
                    "nextaction": {}
                }
            }
        }
    },
    "iappiconholder_clickappbtn": {
        "type": "async",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"1"}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1"}',
            "nextaction": {}
        }
    },
    "iappiconholder_click": {
        "type": "remote_svc",
        "on": "contentnotification",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "iappiconholder_initsummary": {
        "type": "remote_svc",
        "on": "activetrafficquery",
        "event": "activetrafficquery",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "remote_svc",
            "on": "packagerecommandations",
            "input": '{}',
            "shared": true,
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"itaocanresult"}',
                "nextaction": {}
            }
        }
    },
    "repackholder_tostore": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"1"}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","reload":"0","pageid":"cstore"}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "changesrc",
                "input": '{"ordersrc":"packagerecommedation"}',
                "nextaction": {
                    "type": "async",
                    "on": "cstore_store",
                    "event": "changecurrent",
                    "input": '{}',
                    "nextaction": {}
                }
            }
        }
    },
    "repackholder_initfinished": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "dropdown",
        "input": '{}',
        "nextaction": {}
    },
    "detailbtn_toggle0": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "show",
        "input": '{}',
        "nextaction": {
            "type": "remote_svc",
            "on": "trafficquerydetails",
            "event": "trafficdetail",
            "input": '{}',
            "shared": false,
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"overbuy"}',
                "nextaction": {}
            }
        }
    },
    "detailbtn_toggle1": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "hide",
        "input": '{}',
        "nextaction": {}
    },
    "messagebtn_queryMessageStatus": {
        "type": "remote_svc",
        "on": "queryMessageStatus",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "messagebtn_btnclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imsgbox"}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_messagebtn",
            "event": "hidetxt",
            "input": '{}',
            "nextaction": {}
        }
    },
    "messagebtn_init": {
        "type": "async",
        "on": "summarypage_messagebtn",
        "event": "queryMsgBoxTimer",
        "input": '{}',
        "nextaction": {}
    }
};
uiCore.directive('fullscreenbar', ["$templateCache", function(a) {
    return {
        restrict: "AE",
        templateUrl: 'fullscreenbar',
        scope: {},
        controller: ["$scope", "$element", "$attrs", function(d, c, b) {}
        ]
    }
}
]);
uiCore.directive('ipage', function() {
    return {
        restrict: 'AE',
        replace: false,
        scope: {},
        templateUrl: function(elem, attrs) {
            if (null  != attrs.lload && attrs.lload == 0) {
                return "empty";
            } else {
                return attrs.templateurl || '';
                /*modify 'protocol' of undefined*/
            }
        },
        controller: ['$scope', '$element', '$attrs', '$compile', '$templateCache', function($scope, $element, $attrs, $compile, $templateCache) {
            $scope.loadState = $element.attr('lload') | 0;
            if (null  != $element.attr('lload')) {
                var preloadWatch = $scope.$watch(function() {
                    return $element.attr('lload');
                }, function() {
                    var lloadArrr = $element.attr('lload');
                    if (null  != lloadArrr && 1 == lloadArrr && 0 == $scope.loadState) {
                        var data = $templateCache.get($attrs.templateurl);
                        $element.html(data);
                        $compile($element.contents())($scope);
                        $scope.loadState = 1;
                        preloadWatch();
                    }
                }, true);
            }
        }
        ],
        link: function(scope, element, attrs) {}
    };
});
