import cv from '../../';
import Utils from '../utils';


const utils = Utils(cv);
import { expect } from 'chai';
import coreTestSuite from './core';
import imgprocTestSuite from './imgproc';
import calib3dTestSuite from './calib3d';
import features2dTestSuite from './features2d';
import ioTestSuite from './io';
import dnnTestSuite from './dnn';
import machinelearningTestSuite from './machinelearning';
import faceTestSuite from './face';
import objdetectTestSuite from './objdetect';
import photoTestSuite from './photo';
import textTestSuite from './text';
import trackingTestSuite from './tracking';
import videoTestSuite from './video';
import xfeatures2dTestSuite from './xfeatures2d';
import ximgprocTestSuite from './ximgproc';

const modules = [
  'core', 'imgproc',  'calib3d', 'features2d', 'io',
  'dnn', 'ml', 'objdetect', 'photo', 'video'
]

const xmodules = [
  'face', 'text', 'tracking', 'xfeatures2d', 'ximgproc'
]

describe('cv', () => {

  let testImg = null;
  let peoplesTestImg = null;

  const getTestImg = () => {
    if (testImg === null) {
      throw new Error('getTestImg not defined, before hook not called yet');
    }
    return testImg;
  };

  const getPeoplesTestImg = () => {
    if (peoplesTestImg === null) {
      throw new Error('getPeoplesTestImg not defined, before hook not called yet');
    }
    return peoplesTestImg;
  };

  before(() => {
    testImg = utils.readTestImage();
    peoplesTestImg = utils.readPeoplesTestImage();
  });

  let builtModules = modules.concat(xmodules)
  if (process.env.APPVEYOR_BUILD) {
    // OpenCV installed via choco does not include contrib modules
    builtModules = modules
  }
  if (process.env.TEST_MODULE_LIST) {
    builtModules = process.env.TEST_MODULE_LIST.split(',')
  }
  // dnn module for OpenCV 3.2 and lower not supported
  if (utils.cvVersionLowerThan(3, 3, 0)) {
    builtModules = builtModules.filter(m => m !== 'dnn')
  }

  const opencvVersionString = `${cv.version.major}.${cv.version.minor}.${cv.version.revision}`

  console.log('envs are:')
  console.log('OPENCV_VERSION:', process.env.OPENCV_VERSION)
  console.log('TEST_MODULE_LIST:', process.env.TEST_MODULE_LIST)
  console.log('APPVEYOR_BUILD:', process.env.APPVEYOR_BUILD)
  console.log('process.platform:', process.platform)
  console.log()
  console.log('OpenCV version is:', opencvVersionString)
  console.log('compiled with the following modules:', cv.xmodules)
  console.log('expected modules to be built:', builtModules)

  // it('OpenCV version should match', () => {
  //   expect((process.env.OPENCV_VERSION || '').substr(0, 5)).to.equal(
  //     // on osx latest opencv package for major version is installed via brew
  //     process.platform === 'darwin' ? `${cv.version.major}` : opencvVersionString
  //   )
  // })

  it('all modules should be built', () => {
    builtModules.forEach(m => expect(cv.modules).to.have.property(m));
  })
  if (cv.modules.core) {
    describe('core', () => coreTestSuite({ cv, utils, getTestImg }));
  }
  // if (cv.modules.imgproc) {
  //   describe('imgproc', () => imgprocTestSuite({ cv, utils, getTestImg }));
  // }
  if (cv.modules.calib3d) {
    describe('calib3d', () => calib3dTestSuite({ cv, utils, getTestImg }));
  }
  if (cv.modules.features2d) {
    describe('features2d', () => features2dTestSuite({ cv, utils, getTestImg }));
  }
  // if (cv.modules.io) {
  //   describe('io', () => ioTestSuite({ cv, utils, getTestImg }));
  // }
  if (cv.modules.dnn) {
    describe('dnn', () => dnnTestSuite({ cv, utils, getTestImg }));
  }
  if (cv.modules.machinelearning) {
    describe('machinelearning', () => machinelearningTestSuite({ cv, utils, getTestImg }));
  }
  //if (cv.modules.objdetect) {
  //  describe('objdetect', () => objdetectTestSuite({ cv, utils, getTestImg, getPeoplesTestImg }));
  //}
  if (cv.modules.photo) {
    describe('photo', () => photoTestSuite({ cv, utils, getTestImg }));
  }
  if (cv.modules.video) {
    describe('video', () => videoTestSuite({ cv, utils, getTestImg }));
  }
  if (cv.modules.face) {
    describe('face', () => faceTestSuite({ cv, utils, getTestImg }));
  }
  if (cv.modules.text) {
    describe('text', () => textTestSuite({ cv, utils, getTestImg }));
  }
  if (cv.modules.tracking) {
    describe('tracking', () => trackingTestSuite({ cv, utils, getTestImg }));
  }
  if (cv.modules.xfeatures2d) {
    describe('xfeatures2d', () => xfeatures2dTestSuite({ cv, utils, getTestImg }));
  }
  if (cv.modules.ximgproc) {
    describe('ximgproc', () => ximgprocTestSuite({ cv, utils, getTestImg }));
  }
})