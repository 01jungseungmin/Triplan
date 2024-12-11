package com.example.triplan.application.email.service;

import com.example.triplan.application.account.service.AccountService;
import com.example.triplan.domain.account.entity.Account;
import com.example.triplan.domain.account.repository.AccountRepository;
import com.example.triplan.domain.alarm.entity.Alarm;
import com.example.triplan.domain.alarm.enums.AlarmType;
import com.example.triplan.domain.alarm.repository.AlarmRepository;
import com.example.triplan.domain.crew.entity.Crew;
import com.example.triplan.domain.crew.entity.CrewList;
import com.example.triplan.domain.crew.enums.IsAccept;
import com.example.triplan.domain.crew.repository.CrewListRepository;
import com.example.triplan.domain.crew.repository.CrewRepository;
import com.example.triplan.exception.ErrorCode;
import com.example.triplan.exception.TriplanException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@Component
public class MailService {
    private final JavaMailSender emailSender;
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final CrewRepository crewRepository;
    private final CrewListRepository crewListRepository;
    private final AlarmRepository alarmRepository;
    @Value("${spring.mail.username}")
    private String userEmail;

    /** 이메일 전송 **/
    public void sendMail(String email, String crewName, String nickName) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setFrom(userEmail);
            helper.setSubject("[Triplan] " + crewName + " 그룹에서 초대가 왔습니다.");
            String htmlContent = "<html>" +
                    "<head>" +
                    "<style>" +
                    "body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #9cd9f7; }" +
                    ".email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }" +
                    ".header { text-align: center; background-color: #bbe5fa; padding: 10px; border-radius: 8px 8px 0 0; color: white; }" +
                    ".header h1 { margin: 0; font-size: 24px; }" +
                    ".content { padding: 20px; color: #333333; line-height: 1.6; }" +
                    ".content p { margin: 0 0 15px; }" +
                    ".footer { text-align: center; font-size: 12px; color: #777777; margin-top: 20px; }" +
                    ".btn-container { text-align: center; }" +
                    ".btn { display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #9cd9f7; color: white; text-decoration: none; border-radius: 5px; }" +
                    ".highlight { color: #FF0000; font-weight: bold; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='email-container'>" +
                    "<div class='header'>" +
                    "<h1>그룹 초대</h1>" +
                    "</div>" +
                    "<div class='content'>" +
                    "<p>안녕하세요 " + nickName + " 님,</p>" +
                    "<p><strong>" + crewName + "</strong> 그룹에 초대되셨습니다.</p>" +
                    "<p>초대 수락은 마이페이지 알림을 확인해 주세요!</p>" +
                    "<p class='highlight'>※ 회원가입이 되어있지 않을 경우, 해당 이메일로 회원가입해 주시길 바랍니다.</p>" +
                    "<div class='btn-container'>" +
                    "<a href='#' class='btn'>초대 수락하기</a>" +
                    "</div>" +
                    "</div>" +
                    "<div class='footer'>" +
                    "<p>© 2024 Triplan. All rights reserved.</p>" +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);

            emailSender.send(message);
            log.info("HTML 메일 전송 완료");

        } catch (Exception e) {
            log.error("HTML 메일 전송 실패", e);
            throw new TriplanException(ErrorCode.UNABLE_TO_SEND_EMAIL);
        }
    }

    public String setInviteCrew(String email, Long crewId) {
        Account account = accountService.getCurrentUser();
        Account invite = accountRepository.findByEmail(email);
        Crew crew = crewRepository.findById(crewId).orElseThrow(() -> new TriplanException(ErrorCode.ACCOUNT_NOT_FOUND));

        if(crewListRepository.findByCrewAndAccount(crew, invite).isPresent()){
            throw new TriplanException(ErrorCode.INVITATION_ALREADY_SENT);
        }

        CrewList crewList = new CrewList(crew, invite, IsAccept.WAIT);
        crewListRepository.save(crewList);

        alarmRepository.save(new Alarm(AlarmType.INVITE, invite, crewList));

        sendMail(email, crew.getCrewName(), invite.getNickName());
        return "그룹 초대 성공";
    }

}