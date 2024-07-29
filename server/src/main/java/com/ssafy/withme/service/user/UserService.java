package com.ssafy.withme.service.user;


import com.ssafy.withme.domain.user.Follow;
import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.domain.user.constant.UserStatus;
import com.ssafy.withme.dto.UserInfoDto;
import com.ssafy.withme.global.error.ErrorCode;
import com.ssafy.withme.global.exception.EntityNotFoundException;
import com.ssafy.withme.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> findAll() {

        return userRepository.findAll();
    }

    public User findById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.USER_NOT_EXISTS));
    }

    public User findByEmail(String email) {

        log.info("find by email: {}", email);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));
    }

    // find user list by name field
    public List<User> findByNameContaining(String name) {

        List<User> findUserList = userRepository.findByNameContaining(name);

        if (findUserList.isEmpty())
            throw new EntityNotFoundException(ErrorCode.USER_NOT_EXISTS);

        return findUserList;
    }

    @Transactional
    public void updateStatus(Long id, UserStatus status) {

        User findUser = findById(id);

        findUser.updateStatus(status);
    }
}
