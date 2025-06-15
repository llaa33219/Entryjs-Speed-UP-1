'use strict';

Entry.TimeWaitManager = {
    add(id, cb, ms) {
        if (!Entry.timerInstances) {
            Entry.timerInstances = [];
        }

        // 극강 스피드 모드에서는 완전히 즉시 실행
        if (Entry.hyperSpeedMode) {
            if (cb) {
                cb(); // 즉시 실행
            }
            return;
        }

        // 터보 모드이거나 명시적으로 스피드업 모드일 때만 최적화 적용
        if ((Entry.isTurbo || Entry.speedOptimized) && Entry.speedOptimized !== false) {
            const instance = { id, cb, ms: 0, destroyed: false };
            Entry.timerInstances.push(instance);
            if (cb) {
                // 다음 프레임에 즉시 실행
                setTimeout(() => {
                    if (!instance.destroyed) {
                        cb();
                        this.remove(id);
                    }
                }, 0);
            }
            return;
        }

        const instance = new Entry.TimeWait(id, cb, ms);
        Entry.timerInstances.push(instance);
    },
    remove(id) {
        if (!Entry.timerInstances || Entry.timerInstances.length == 0) {
            return;
        }
        Entry.timerInstances = Entry.timerInstances.filter((instance) => {
            if (instance.id === id) {
                if (instance.destroyed !== undefined) {
                    instance.destroyed = true;
                }
                return false;
            } else {
                return true;
            }
        });
    },
};

Entry.TimeWait = class TimeWait {
    constructor(id, cb, ms) {
        this.id = id;
        this.cb = cb;
        
        // 극강 스피드 모드에서는 즉시 실행
        if (Entry.hyperSpeedMode) {
            this.ms = 0;
            if (cb) {
                setTimeout(() => cb(), 0);
            }
            return;
        }
        
        // 스피드 최적화 모드이고 명시적으로 활성화된 경우에만 딜레이를 최소화
        if (Entry.speedOptimized && Entry.speedOptimized !== false) {
            this.ms = Math.min(ms, 1); // 최대 1ms로 제한
        } else {
            this.ms = ms;
        }
        
        this.startTime = performance.now();
        this.timer = setTimeout(this.callback.bind(this), this.ms);
    }

    callback() {
        if (this.cb) {
            this.cb();
            this.destroy();
        }
    }

    pause() {
        if (this.timer) {
            this.ms = this.ms - (performance.now() - this.startTime);
            clearTimeout(this.timer);
        }
    }

    resume() {
        // 스피드 최적화 모드에서는 resume도 빠르게
        const resumeTime = Entry.speedOptimized ? Math.min(this.ms, 1) : this.ms;
        this.timer = setTimeout(this.callback.bind(this), resumeTime);
        this.startTime = performance.now();
    }

    destroy() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        delete this.timer;
        delete this.cb;
        delete this.ms;
        delete this.startTime;
        Entry.TimeWaitManager.remove(this.id);
    }
};

// 스피드 최적화 모드 활성화
Entry.speedOptimized = true;
