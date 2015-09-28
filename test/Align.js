'use strict';

import dom from 'bower:metal/src/dom/dom';
import Position from '../src/Position';
import Align from '../src/Align';
import PositionTestHelper from './fixture/PositionTestHelper';

var element;
var mutable;
var center;
var offsetParent;

describe('Align', function() {
	afterEach(function() {
		dom.exitDocument(element);
		dom.exitDocument(mutable);
		dom.exitDocument(center);
		dom.exitDocument(offsetParent);
		window.scrollTo(0, 0);
	});

	beforeEach(function() {
		dom.enterDocument('<div id="element" style="position:absolute;height: 25px;width:25px;"></div>');
		dom.enterDocument('<div id="center" style="position:absolute;top:100px;left:100px;width:50px;height:50px;"></div>');
		dom.enterDocument('<div id="mutable" style="position:absolute;width:50px;height:50px;"></div>');
		dom.enterDocument('<div id="offsetParent" style="position:absolute;width:500px;height:500px;top:100px;left:100px;"></div>');
		element = dom.toElement('#element');
		mutable = dom.toElement('#mutable');
		center = dom.toElement('#center');
		offsetParent = dom.toElement('#offsetParent');

		mutable.style.top = '100px';
		mutable.style.left = '100px';
		mutable.style.bottom = '';
		mutable.style.right = '';
	});

	it('should align at bottom', function() {
		Align.align(element, center, Align.Bottom);
		assert.strictEqual('150px', element.style.top);
		assert.strictEqual('112.5px', element.style.left);
	});

	it('should align at right', function() {
		Align.align(element, center, Align.Right);
		assert.strictEqual('112.5px', element.style.top);
		assert.strictEqual('150px', element.style.left);
	});

	it('should align at top', function() {
		Align.align(element, center, Align.Top);
		assert.strictEqual('75px', element.style.top);
		assert.strictEqual('112.5px', element.style.left);
	});

	it('should align at left', function() {
		Align.align(element, center, Align.Left);
		assert.strictEqual('112.5px', element.style.top);
		assert.strictEqual('75px', element.style.left);
	});

	it('should try to align at top then move right', function() {
		mutable.style.top = 0;
		Align.align(element, mutable, Align.Top);
		assert.strictEqual('12.5px', element.style.top);
		assert.strictEqual('150px', element.style.left);
	});

	it('should try to align at right then move bottom', function() {
		mutable.style.left = (Position.getRegion(window).right - 50) + 'px';
		Align.align(element, mutable, Align.Right);
		var mutableRegion = Position.getRegion(mutable);
		var elementRegion = Position.getRegion(element);
		assert.strictEqual('150px', element.style.top);
		assert.strictEqual((mutableRegion.left + mutableRegion.width / 2 - elementRegion.width / 2) + 'px', element.style.left);
	});

	it('should try to align at bottom then move left', function() {
		mutable.style.bottom = Position.getRegion(window).bottom + 'px';
		mutable.style.top = (Position.getRegion(window).bottom - 50) + 'px';
		Align.align(element, mutable, Align.Bottom);
		var mutableRegion = Position.getRegion(mutable);
		var elementRegion = Position.getRegion(element);
		assert.strictEqual((mutableRegion.top + mutableRegion.height / 2 - elementRegion.height / 2) + 'px', element.style.top);
		assert.strictEqual((mutableRegion.left - elementRegion.width) + 'px', element.style.left);
	});

	it('should try to align at left then move top', function() {
		mutable.style.top = '100px';
		mutable.style.left = 0;
		Align.align(element, mutable, Align.Left);
		assert.strictEqual('75px', element.style.top);
		assert.strictEqual('12.5px', element.style.left);
	});

	it('should compute pageYOffset when aligning element with position absolute', function() {
		element.style.position = 'absolute';
		mutable.style.position = 'relative';
		mutable.style.top = '10000px';
		mutable.style.left = '10000px';
		window.scrollTo(5000, 5000);
		Align.align(element, mutable, Align.Left);
		assert.strictEqual('10020.5px', element.style.top);
		assert.strictEqual('9983px', element.style.left);
	});

	it(
		'should not compute pageYOffset when aligning element with position fixed',
		PositionTestHelper.skipSafariMobile(function() {
			element.style.position = 'fixed';
			mutable.style.position = 'relative';
			mutable.style.top = '10000px';
			mutable.style.left = '10000px';
			window.scrollTo(5000, 5000);
			Align.align(element, mutable, Align.Left);
			assert.strictEqual('5020.5px', element.style.top);
			assert.strictEqual('4983px', element.style.left);
		})
	);

	it('should align respecting parent offset', function() {
		offsetParent.appendChild(element);
		offsetParent.appendChild(center);
		Align.align(element, center, Align.Bottom);
		assert.strictEqual('150px', element.style.top);
		assert.strictEqual('112.5px', element.style.left);
	});

	it('should align respecting parent offset with translate css', function() {
		offsetParent.style['-webkit-transform'] = 'translate(-100px, -100px)';
		offsetParent.style['-ms-transform'] = 'translate(-100px, -100px)';
		offsetParent.style.transform = 'translate(-100px, -100px)';
		offsetParent.appendChild(element);
		offsetParent.appendChild(center);
		Align.align(element, center, Align.Bottom);
		assert.strictEqual('150px', element.style.top);
		assert.strictEqual('112.5px', element.style.left);
	});

	it('should check if align position is valid', function() {
		assert.ok(Align.isValidPosition(Align.Top));
		assert.ok(Align.isValidPosition(Align.Right));
		assert.ok(Align.isValidPosition(Align.Bottom));
		assert.ok(Align.isValidPosition(Align.Left));

		assert.ok(!Align.isValidPosition(-1));
		assert.ok(!Align.isValidPosition(4));
	});
});
