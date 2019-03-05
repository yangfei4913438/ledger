/**
 * 功能：
 *    当前文件和enzyme和react连接的配置文件
 *    Testing React with Jest, Enzyme, and Sinon
 *
 * 注意事项:
 * 1、此文件必须放置在src目录下，且文件名称不能改变；
 * 2、项目运行测试的时候，会自动加载此文件，并且和jest进行关联
 * */
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import sinon from 'sinon';

// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Define globals to cut down on imports in test files
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
