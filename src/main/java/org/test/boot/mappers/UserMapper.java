package org.test.boot.mappers;

import org.test.boot.domain.User;

/**
 * Created by Administrator on 2015-05-17.
 */
public interface UserMapper {
    User getByID(String userId);
}
