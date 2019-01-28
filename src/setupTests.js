/**
 * 功能：
 *    当前文件和enzyme和react连接的配置文件
 *
 * 注意事项:
 * 1、此文件必须放置在src目录下，且文件名称不能改变；
 * 2、项目运行测试的时候，会自动加载此文件，并且和jest进行关联
 * */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// 将enzyme和react关联起来
configure({ adapter: new Adapter() });
