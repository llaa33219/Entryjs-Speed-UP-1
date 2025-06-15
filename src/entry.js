__webpack_public_path__ = global.PUBLIC_PATH_FOR_ENTRYJS || 'dist/';
import showConsoleBanner from './util/functions/showConsoleBanner';
import 'simplebar/dist/simplebar.css';

const Entry = {};
Entry.EXPANSION_BLOCK = {};
Entry.EXPANSION_BLOCK_LIST = {};
Entry.AI_UTILIZE_BLOCK = {};
Entry.AI_UTILIZE_BLOCK_LIST = {};
Entry.AI_UTILIZE_BLOCK_LIST_DEPRECATED = {};
Entry.ALL_AI_UTILIZE_BLOCK_LIST = {};

module.exports = Entry;
global.Entry = Entry;

require('./core/collection');
require('./core/db');
require('./core/dom');
require('./core/event');
require('./core/model');
require('./core/observer');
require('./core/svg');
require('core-js/stable/object/values');
require('./graphicEngine/FakePIXI');
require('./css/entry.less');
require('./class/time_wait');
require('./class/container');
require('./class/dialog');
require('./class/doneProject');
require('./class/engine');
require('./class/entity');
require('./class/function');
require('./class/helper');
require('./class/intro');
require('./class/object');
require('./class/painter');
require('./class/LiterallycanvasPainter');
require('./class/pdf');
require('./class/playground');
require('./class/popup');
require('./class/popup_helper');
require('./class/popup_list');
require('./class/hw');
require('./class/hw_lite');
require('./class/entryModuleLoader');
require('./class/project');
require('./class/property_panel');
require('./class/reporter');
require('./class/scene');
require('./class/blockCountViewer');
require('./class/stage');
require('./class/stamp_entity');
require('./class/toast');
require('./class/variable');
require('./class/variable_container');
require('./command/command');
require('./command/commander');
require('./extensions/extension');
require('./extensions/target_checker');
require('./log/activity');
require('./log/activityReporter');
require('./log/recorder');
require('./log/state');
require('./log/state_manager');
require('./model/block_model');
require('./model/block_render_model');
require('./model/box_model');
require('./model/drag_instance');
require('./model/thread_model');
require('./parser-no/block');
require('./parser-no/js');
require('./parser-no/parser');
require('./playground/block');
require('./playground/block_entry');
require('./playground/block_menu');
require('./playground/block_menu_scroll');
require('./playground/block_view');
require('./playground/comment');
require('./playground/board');
require('./playground/code');
require('./playground/code_view');
require('./playground/connection_ripple');
require('./playground/executors');
require('./playground/scope');
require('./playground/globalSvg');
require('./playground/mutator');
require('./playground/renderView');
require('./playground/scroll');
require('./playground/skeleton');
require('./playground/skinner');
require('./playground/thread');
require('./playground/thread_view');
require('./playground/trashcan');
require('./playground/zoom_controller');
require('./playground/vim');
require('./playground/workspace');
require('./textcoding/parser');
require('./util/block_driver');
require('./util/contextmenu');
require('./util/curtain');
require('./util/fuzzy');
require('./util/init');
require('./util/loader');
require('./util/restrictor');
require('./util/static');
require('./util/tooltip');
require('./util/tvCast');
require('./util/virtualScroll');
require('./util/htmlElementPatcher');
require('./util/eventHandler');
require('./util/utils');
require('./util/youtube');
require('./util/modal');
require('./command/commands/block');
require('./command/commands/comment');
require('./command/commands/container');
require('./command/commands/dataTable');
require('./command/commands/engine');
require('./command/commands/function');
require('./command/commands/object');
require('./command/commands/painter');
require('./command/commands/playground');
require('./command/commands/textbox');
require('./command/commands/variableContainer');
require('./command/commands/scene');
require('./playground/extension/extension');
require('./playground/extension/guide');
require('./playground/extension/side_tag');
require('./playground/field/field');
require('./playground/field/angle');
require('./playground/field/block');
require('./playground/field/color');
require('./playground/field/led');
require('./playground/field/led2');
require('./playground/field/musicScale');
require('./playground/field/dropdown');
require('./playground/field/dropdownDynamic');
require('./playground/field/dropdownExtra');
require('./playground/field/image');
require('./playground/field/indicator');
require('./playground/field/keyboardInput');
require('./playground/field/lineBreak');
require('./playground/field/output');
require('./playground/field/statement');
require('./playground/field/text');
require('./playground/field/textDynamic');
require('./playground/field/textInput');
require('./textcoding/ast/jsAstGenerator');
require('./textcoding/ast/pyAstGenerator');
require('./textcoding/data_processing/map');
require('./textcoding/data_processing/queue');
require('./textcoding/error/textCodingError');
require('./textcoding/hint/python');
require('./textcoding/static/codeMap');
require('./textcoding/static/keyboardCode');
require('./textcoding/util/console');
require('./textcoding/util/textCodingUtil');

window.Entry = Entry;
showConsoleBanner();

// 스피드 최적화 설정 - 기본적으로 극강 속도 모드 활성화
Entry.speedOptimized = true; // 극강 속도 모드 기본 활성화
Entry.maxSpeedMode = true; // 최고 속도 모드
Entry.hyperSpeedMode = true; // 극강 속도 모드

// 원본 함수들 백업
Entry._originalFPS = null;
Entry._originalTickTime = null;

// 스피드 최적화 제어 함수들
Entry.enableSpeedOptimization = function() {
    Entry.speedOptimized = true;
    console.log('Entry.js 스피드 최적화가 활성화되었습니다.');
};

Entry.disableSpeedOptimization = function() {
    Entry.speedOptimized = false;
    Entry.maxSpeedMode = false;
    Entry.hyperSpeedMode = false;
    console.log('Entry.js 스피드 최적화가 비활성화되었습니다.');
};

Entry.enableMaxSpeedMode = function() {
    Entry.speedOptimized = true;
    Entry.maxSpeedMode = true;
    Entry.isTurbo = true;
    
    // FPS를 극도로 높이기
    if (!Entry._originalFPS) {
        Entry._originalFPS = Entry.FPS;
        Entry._originalTickTime = Entry.tickTime;
    }
    Entry.FPS = 1000; // 1000 FPS
    Entry.tickTime = 50; // 50ms 동안 최대한 많이 실행
    
    console.log('Entry.js 최고 속도 모드가 활성화되었습니다.');
};

Entry.enableHyperSpeedMode = function() {
    Entry.speedOptimized = true;
    Entry.maxSpeedMode = true;
    Entry.hyperSpeedMode = true;
    Entry.isTurbo = true;
    
    // 안전한 극강 설정
    if (!Entry._originalFPS) {
        Entry._originalFPS = Entry.FPS;
        Entry._originalTickTime = Entry.tickTime;
    }
    Entry.FPS = 500; // 500 FPS로 안전하게 조정
    Entry.tickTime = 100; // 100ms로 조정
    
    // requestAnimationFrame 오버라이드 제거 (무한 재귀 방지)
    
    console.log('🚀 Entry.js 극강 속도 모드가 활성화되었습니다! 🚀');
};

Entry.disableMaxSpeedMode = function() {
    Entry.maxSpeedMode = false;
    Entry.hyperSpeedMode = false;
    Entry.isTurbo = false; // isTurbo도 비활성화
    
    // 원본 FPS 복원
    if (Entry._originalFPS) {
        Entry.FPS = Entry._originalFPS;
        Entry.tickTime = Entry._originalTickTime;
        Entry._originalFPS = null;
        Entry._originalTickTime = null;
    }
    
    console.log('Entry.js 최고 속도 모드가 비활성화되었습니다.');
};

Entry.getSpeedOptimizationStatus = function() {
    return {
        speedOptimized: Entry.speedOptimized,
        maxSpeedMode: Entry.maxSpeedMode,
        hyperSpeedMode: Entry.hyperSpeedMode,
        isTurbo: Entry.isTurbo,
        FPS: Entry.FPS,
        tickTime: Entry.tickTime
    };
};

// 기본적으로 극강 속도 모드 활성화
Entry.isTurbo = true;
Entry.FPS = 500; // 안전한 극강 속도
Entry.tickTime = 100;

// 초기 설정 메시지
console.log('🚀 Entry.js 극강 속도 모드가 기본으로 활성화되었습니다! 🚀');
console.log('제어 함수: Entry.enableSpeedOptimization(), Entry.disableSpeedOptimization()');
console.log('최고 속도 모드: Entry.enableMaxSpeedMode(), Entry.disableMaxSpeedMode()');
console.log('🚀 극강 속도 모드: Entry.enableHyperSpeedMode()');
console.log('속도 해제: Entry.disableMaxSpeedMode()');
console.log('상태 확인: Entry.getSpeedOptimizationStatus()');
