    package com.example.triplan.application.answer.dto.request;

    import com.example.triplan.domain.account.entity.Account;
    import com.example.triplan.domain.board.entity.Board;
    import jakarta.persistence.Column;
    import jakarta.persistence.JoinColumn;
    import jakarta.persistence.ManyToOne;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.Setter;

    @Getter
    public class AnswerRequest {
        private String content;
    }
