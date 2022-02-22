import { LeftbarComponent } from './components/layout/leftbar.component';
import { MainComponent } from './pages/main.component';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ConfigComponent } from './components/layout/config.component';
import { AppFooterComponent } from './components/layout/app.footer.component';

describe('AppComponent', () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, RouterTestingModule],
            declarations: [
                AppComponent,
                MainComponent,
                ConfigComponent,
                LeftbarComponent,
                AppFooterComponent,
            ]
        }).compileComponents();
    }));
    it('should create the app', waitForAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
